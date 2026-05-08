const { body, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const validateRegister = [
  body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().notEmpty().withMessage('Last name is required').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[0-9]{10}$|^\+91[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
  body('state').notEmpty().withMessage('State is required'),
  body('district').notEmpty().withMessage('District is required'),
  body('taluk').notEmpty().withMessage('Taluk is required'),
];

/**
 * Validation rules for user login
 */
const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Validation rules for OTP verification
 */
const validateOTP = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('otp').matches(/^[0-9]{6}$/).withMessage('OTP must be 6 digits'),
];

/**
 * Validation rules for queue token creation
 */
const validateQueueToken = [
  body('officeId').notEmpty().isMongoId().withMessage('Valid office ID is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('priority')
    .optional()
    .isIn(['normal', 'senior_citizen', 'pwd', 'pregnant', 'reserved'])
    .withMessage('Invalid priority value'),
];

/**
 * Validation rules for office creation/update
 */
const validateOffice = [
  body('name').trim().notEmpty().withMessage('Office name is required'),
  body('officeType').notEmpty().withMessage('Office type is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('district').notEmpty().withMessage('District is required'),
  body('taluk').notEmpty().withMessage('Taluk is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
];

module.exports = {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateOTP,
  validateQueueToken,
  validateOffice,
};
