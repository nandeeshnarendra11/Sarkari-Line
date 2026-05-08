const Office = require('../models/Office');
const { asyncHandler } = require('../middleware/error');

/**
 * @route POST /api/offices
 * @desc Create a new office (admin only)
 */
exports.createOffice = asyncHandler(async (req, res) => {
  const {
    name,
    officeType,
    state,
    district,
    taluk,
    address,
    phone,
    email,
    latitude,
    longitude,
    services,
    operatingHours,
    workingDays,
    maxQueue,
    tokenGenerationSystem,
    description,
    officialWebsite,
  } = req.body;

  const office = new Office({
    name,
    officeType,
    state,
    district,
    taluk,
    address,
    phone,
    email,
    latitude,
    longitude,
    services: services || [],
    operatingHours: operatingHours || { opening: '09:00', closing: '17:00' },
    workingDays: workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    maxQueue: maxQueue || 100,
    tokenGenerationSystem,
    description,
    officialWebsite,
    verifiedBy: req.user.id,
    isVerified: true,
  });

  await office.save();

  res.status(201).json({
    success: true,
    message: 'Office created successfully',
    data: office,
  });
});

/**
 * @route GET /api/offices
 * @desc Get all offices with filters
 */
exports.getAllOffices = asyncHandler(async (req, res) => {
  const { state, district, taluk, officeType, serviceType } = req.query;

  const filter = { isActive: true, isVerified: true };

  if (state) filter.state = state;
  if (district) filter.district = district;
  if (taluk) filter.taluk = taluk;
  if (officeType) filter.officeType = officeType;
  if (serviceType) filter.services = serviceType;

  const offices = await Office.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: offices.length,
    data: offices,
  });
});

/**
 * @route GET /api/offices/:officeId
 * @desc Get office details
 */
exports.getOffice = asyncHandler(async (req, res) => {
  const office = await Office.findById(req.params.officeId).populate(
    'managedBy verifiedBy',
    'firstName lastName email'
  );

  if (!office) {
    return res.status(404).json({
      success: false,
      message: 'Office not found',
    });
  }

  res.status(200).json({
    success: true,
    data: office,
  });
});

/**
 * @route PUT /api/offices/:officeId
 * @desc Update office details (admin/manager only)
 */
exports.updateOffice = asyncHandler(async (req, res) => {
  const { officeId } = req.params;

  const office = await Office.findById(officeId);

  if (!office) {
    return res.status(404).json({
      success: false,
      message: 'Office not found',
    });
  }

  // Check authorization
  if (office.managedBy && office.managedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this office',
    });
  }

  // Update allowed fields
  const allowedFields = [
    'phone',
    'email',
    'address',
    'operatingHours',
    'workingDays',
    'maxQueue',
    'currentWaitTime',
    'status',
    'services',
    'description',
    'officialWebsite',
  ];

  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) {
      office[key] = req.body[key];
    }
  });

  await office.save();

  res.status(200).json({
    success: true,
    message: 'Office updated successfully',
    data: office,
  });
});

/**
 * @route GET /api/offices/:officeId/nearby
 * @desc Get nearby offices based on coordinates
 */
exports.getNearbyOffices = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 5000 } = req.query; // radius in meters

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required',
    });
  }

  const offices = await Office.find({
    isActive: true,
    latitude: { $exists: true },
    longitude: { $exists: true },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: radius,
      },
    },
  });

  res.status(200).json({
    success: true,
    count: offices.length,
    data: offices,
  });
});

/**
 * @route POST /api/offices/:officeId/update-status
 * @desc Update office status (open/busy/closed)
 */
exports.updateOfficeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['open', 'busy', 'partial', 'closed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status',
    });
  }

  const office = await Office.findByIdAndUpdate(
    req.params.officeId,
    { status },
    { new: true, runValidators: true }
  );

  if (!office) {
    return res.status(404).json({
      success: false,
      message: 'Office not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Office status updated',
    data: office,
  });
});

/**
 * @route GET /api/offices/search
 * @desc Search offices by name or type
 */
exports.searchOffices = asyncHandler(async (req, res) => {
  const { query, state } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required',
    });
  }

  const filter = {
    isActive: true,
    isVerified: true,
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { officeType: { $regex: query, $options: 'i' } },
      { address: { $regex: query, $options: 'i' } },
    ],
  };

  if (state) filter.state = state;

  const offices = await Office.find(filter).limit(10);

  res.status(200).json({
    success: true,
    count: offices.length,
    data: offices,
  });
});

/**
 * @route GET /api/offices/:officeId/analytics
 * @desc Get office analytics and statistics (admin only)
 */
exports.getOfficeAnalytics = asyncHandler(async (req, res) => {
  const QueueToken = require('../models/QueueToken');
  const { officeId } = req.params;
  const { startDate, endDate } = req.query;

  const office = await Office.findById(officeId);

  if (!office) {
    return res.status(404).json({
      success: false,
      message: 'Office not found',
    });
  }

  const filter = { office: officeId };

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const totalTokens = await QueueToken.countDocuments(filter);
  const completedTokens = await QueueToken.countDocuments({ ...filter, status: 'completed' });
  const cancelledTokens = await QueueToken.countDocuments({ ...filter, status: 'cancelled' });
  const noShowTokens = await QueueToken.countDocuments({ ...filter, status: 'no_show' });

  // Average ratings
  const ratings = await QueueToken.aggregate([
    { $match: { ...filter, rating: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      office: {
        id: office._id,
        name: office.name,
        status: office.status,
      },
      statistics: {
        totalTokens,
        completedTokens,
        cancelledTokens,
        noShowTokens,
        completionRate: totalTokens > 0 ? ((completedTokens / totalTokens) * 100).toFixed(2) + '%' : '0%',
        averageRating: ratings[0]?.averageRating || 0,
        totalRatings: ratings[0]?.totalRatings || 0,
      },
    },
  });
});
