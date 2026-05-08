const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin, validateOTP, handleValidationErrors } = require('../middleware/validation');

// Public routes
router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/verify-otp', validateOTP, handleValidationErrors, authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);

module.exports = router;
