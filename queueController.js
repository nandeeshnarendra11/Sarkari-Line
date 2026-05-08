const QueueToken = require('../models/QueueToken');
const Office = require('../models/Office');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/error');
const { sendQueueStatusSMS, sendAppointmentReminderSMS } = require('../config/sms');

/**
 * @route POST /api/queue/generate-token
 * @desc Generate a new queue token for user
 */
exports.generateToken = asyncHandler(async (req, res) => {
  const { officeId, serviceType, priority } = req.body;

  // Validate office exists
  const office = await Office.findById(officeId);
  if (!office) {
    return res.status(404).json({
      success: false,
      message: 'Office not found',
    });
  }

  // Check if office is currently open
  if (!office.isCurrentlyOpen()) {
    return res.status(400).json({
      success: false,
      message: 'Office is currently closed. Please come back during operating hours.',
    });
  }

  // Get next token number for today
  const today = new Date().setHours(0, 0, 0, 0);
  const lastToken = await QueueToken.findOne({
    office: officeId,
    date: new Date(today),
  })
    .sort({ tokenNumber: -1 })
    .select('tokenNumber');

  const nextTokenNumber = (lastToken?.tokenNumber || 0) + 1;

  if (nextTokenNumber > office.maxQueue) {
    return res.status(400).json({
      success: false,
      message: 'Daily queue limit reached. Please try again tomorrow.',
    });
  }

  // Count current position in queue
  const position = await QueueToken.countDocuments({
    office: officeId,
    status: { $in: ['waiting', 'called'] },
    date: new Date(today),
  });

  // Create token
  const token = new QueueToken({
    tokenNumber: nextTokenNumber,
    office: officeId,
    user: req.user.id,
    serviceType,
    priority: priority || 'normal',
    position: position + 1,
    estimatedWaitTime: office.currentWaitTime || 30,
    date: new Date(today),
  });

  await token.save();
  await token.populate('office');

  // Send SMS notification
  try {
    await sendQueueStatusSMS(`+91${req.user.phone}`, {
      tokenNumber: token.tokenNumber,
      officeName: office.name,
      waitTime: token.estimatedWaitTime,
    });
    token.smsNotificationSent = true;
    await token.save();
  } catch (smsError) {
    console.error('SMS sending failed:', smsError);
  }

  res.status(201).json({
    success: true,
    message: 'Token generated successfully',
    data: {
      token: {
        id: token._id,
        tokenNumber: token.tokenNumber,
        position: token.position,
        estimatedWaitTime: token.estimatedWaitTime,
        office: {
          id: office._id,
          name: office.name,
          address: office.address,
        },
      },
    },
  });
});

/**
 * @route GET /api/queue/my-tokens
 * @desc Get all tokens for current user
 */
exports.getMyTokens = asyncHandler(async (req, res) => {
  const tokens = await QueueToken.find({ user: req.user.id })
    .populate('office', 'name address state district')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tokens.length,
    data: tokens,
  });
});

/**
 * @route GET /api/queue/token/:tokenId
 * @desc Get token details
 */
exports.getTokenDetails = asyncHandler(async (req, res) => {
  const token = await QueueToken.findById(req.params.tokenId).populate(
    'office user',
    'name address phone email firstName lastName'
  );

  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found',
    });
  }

  res.status(200).json({
    success: true,
    data: token,
  });
});

/**
 * @route GET /api/queue/office/:officeId/status
 * @desc Get current queue status for an office
 */
exports.getOfficeQueueStatus = asyncHandler(async (req, res) => {
  const { officeId } = req.params;

  const office = await Office.findById(officeId);
  if (!office) {
    return res.status(404).json({
      success: false,
      message: 'Office not found',
    });
  }

  const today = new Date().setHours(0, 0, 0, 0);

  // Get queue statistics
  const waitingCount = await QueueToken.countDocuments({
    office: officeId,
    status: 'waiting',
    date: new Date(today),
  });

  const calledCount = await QueueToken.countDocuments({
    office: officeId,
    status: 'called',
    date: new Date(today),
  });

  const completedCount = await QueueToken.countDocuments({
    office: officeId,
    status: 'completed',
    date: new Date(today),
  });

  // Get average service time
  const completedTokens = await QueueToken.find({
    office: officeId,
    status: 'completed',
    date: new Date(today),
  }).select('actualWaitTime');

  const avgWaitTime =
    completedTokens.length > 0
      ? Math.ceil(
          completedTokens.reduce((sum, t) => sum + (t.actualWaitTime || 0), 0) / completedTokens.length
        )
      : office.currentWaitTime;

  res.status(200).json({
    success: true,
    data: {
      office: {
        id: office._id,
        name: office.name,
        status: office.status,
      },
      queue: {
        waiting: waitingCount,
        called: calledCount,
        completed: completedCount,
        averageWaitTime: avgWaitTime,
        estimatedWaitTime: office.currentWaitTime,
      },
    },
  });
});

/**
 * @route POST /api/queue/token/:tokenId/cancel
 * @desc Cancel a token
 */
exports.cancelToken = asyncHandler(async (req, res) => {
  const token = await QueueToken.findById(req.params.tokenId);

  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found',
    });
  }

  // Check if user owns the token
  if (token.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to cancel this token',
    });
  }

  // Can only cancel if waiting
  if (token.status !== 'waiting') {
    return res.status(400).json({
      success: false,
      message: 'Can only cancel tokens that are waiting in queue',
    });
  }

  token.status = 'cancelled';
  await token.save();

  res.status(200).json({
    success: true,
    message: 'Token cancelled successfully',
    data: token,
  });
});

/**
 * @route POST /api/queue/token/:tokenId/rate
 * @desc Rate and provide feedback for a completed service
 */
exports.rateService = asyncHandler(async (req, res) => {
  const { rating, feedback } = req.body;

  const token = await QueueToken.findById(req.params.tokenId);

  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found',
    });
  }

  // Check if user owns the token
  if (token.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to rate this token',
    });
  }

  // Validate rating
  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be between 1 and 5',
    });
  }

  token.rating = rating;
  token.feedback = feedback || '';
  await token.save();

  res.status(200).json({
    success: true,
    message: 'Thank you for your feedback!',
    data: token,
  });
});

/**
 * @route GET /api/queue/office/:officeId/tokens
 * @desc Get all tokens for an office (admin only)
 */
exports.getOfficeTokens = asyncHandler(async (req, res) => {
  const { officeId } = req.params;
  const { status, date } = req.query;

  const filter = { office: officeId };

  if (status) {
    filter.status = status;
  }

  if (date) {
    const startDate = new Date(date).setHours(0, 0, 0, 0);
    const endDate = new Date(date).setHours(23, 59, 59, 999);
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const tokens = await QueueToken.find(filter)
    .populate('user', 'firstName lastName email phone')
    .sort({ tokenNumber: 1 });

  res.status(200).json({
    success: true,
    count: tokens.length,
    data: tokens,
  });
});

/**
 * @route PUT /api/queue/token/:tokenId/status
 * @desc Update token status (admin only)
 */
exports.updateTokenStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['waiting', 'called', 'in_service', 'completed', 'cancelled', 'no_show'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status',
    });
  }

  const token = await QueueToken.findById(req.params.tokenId);

  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found',
    });
  }

  // Update timestamps based on status
  if (status === 'called' && !token.calledTime) {
    token.calledTime = new Date();
  }

  if (status === 'in_service' && !token.serviceStartTime) {
    token.serviceStartTime = new Date();
  }

  if (status === 'completed' && !token.completionTime) {
    token.completionTime = new Date();
    token.calculateWaitTime();
  }

  token.status = status;
  await token.save();

  res.status(200).json({
    success: true,
    message: 'Token status updated',
    data: token,
  });
});
