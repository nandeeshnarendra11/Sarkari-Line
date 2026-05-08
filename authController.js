const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error');
const { sendOTP, sendRegistrationSMS } = require('../config/sms');

/**
 * @route POST /api/auth/register
 * @desc Register a new user with SMS OTP
 */
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword, state, district, taluk, aadharNumber } = req.body;

  // Normalize phone number - remove +91 if present, keep only last 10 digits
  const normalizedPhone = phone.replace(/^\+91/, '').slice(-10);

  // Check if user already exists
  let user = await User.findOne({ $or: [{ email }, { phone: normalizedPhone }] });
  if (user) {
    return res.status(400).json({
      success: false,
      message: user.email === email ? 'Email already registered' : 'Phone number already registered',
    });
  }

  // Create user
  user = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone: normalizedPhone,
    password,
    confirmPassword,
    state,
    district,
    taluk,
    aadharNumber,
  });

  await user.save();

  // Generate OTP
  const otp = user.generateOTP();
  await user.save();

  // Send OTP via SMS
  try {
    await sendOTP(`+91${normalizedPhone}`, otp);
  } catch (smsError) {
    console.error('SMS sending failed:', smsError);
    // Continue anyway - user can manually enter OTP or request new one
  }

  res.status(201).json({
    success: true,
    message: 'User registered successfully. OTP sent to your phone.',
    data: {
      userId: user._id,
      email: user.email,
      phone: normalizedPhone,
      requiresOTPVerification: true,
    },
  });
});

/**
 * @route POST /api/auth/verify-otp
 * @desc Verify OTP and complete registration
 */
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select('+otp +otpExpire');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Verify OTP
  if (!user.verifyOTP(otp)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired OTP',
    });
  }

  // Mark email and phone as verified
  user.phoneVerified = true;
  user.emailVerified = true;
  user.accountVerified = true;
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();

  // Send registration confirmation SMS
  try {
    await sendRegistrationSMS(`+91${user.phone}`, user);
  } catch (smsError) {
    console.error('Registration SMS sending failed:', smsError);
  }

  // Generate JWT token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'OTP verified successfully. Registration complete!',
    data: {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        state: user.state,
        district: user.district,
        taluk: user.taluk,
        role: user.role,
      },
    },
  });
});

/**
 * @route POST /api/auth/resend-otp
 * @desc Resend OTP to user's phone
 */
exports.resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  if (user.accountVerified) {
    return res.status(400).json({
      success: false,
      message: 'Account already verified',
    });
  }

  // Generate new OTP
  const otp = user.generateOTP();
  await user.save();

  // Send OTP via SMS
  try {
    await sendOTP(`+91${user.phone}`, otp);
  } catch (smsError) {
    console.error('SMS sending failed:', smsError);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'OTP sent successfully',
    data: {
      email: user.email,
    },
  });
});

/**
 * @route POST /api/auth/login
 * @desc Login user with email and password
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Check for user
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password +lockUntil +loginAttempts');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Check if account is locked
  if (user.isLocked) {
    return res.status(401).json({
      success: false,
      message: 'Account locked due to multiple failed login attempts. Try again in 30 minutes.',
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    await user.incLoginAttempts();
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Check if account is verified
  if (!user.accountVerified) {
    return res.status(403).json({
      success: false,
      message: 'Account not verified. Please verify OTP first.',
    });
  }

  // Reset login attempts and update last login
  await user.resetLoginAttempts();

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        state: user.state,
        district: user.district,
        taluk: user.taluk,
        role: user.role,
        accountVerified: user.accountVerified,
      },
    },
  });
});

/**
 * @route GET /api/auth/me
 * @desc Get current logged in user
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 */
exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
