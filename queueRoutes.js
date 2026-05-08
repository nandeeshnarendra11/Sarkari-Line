const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const { protect, authorize } = require('../middleware/auth');
const { validateQueueToken, handleValidationErrors } = require('../middleware/validation');

// Protected routes - User operations
router.post(
  '/generate-token',
  protect,
  validateQueueToken,
  handleValidationErrors,
  queueController.generateToken
);

router.get('/my-tokens', protect, queueController.getMyTokens);

router.get('/token/:tokenId', protect, queueController.getTokenDetails);

router.get('/office/:officeId/status', queueController.getOfficeQueueStatus);

router.post('/token/:tokenId/cancel', protect, queueController.cancelToken);

router.post('/token/:tokenId/rate', protect, queueController.rateService);

// Admin routes
router.get('/office/:officeId/tokens', protect, authorize('admin', 'moderator'), queueController.getOfficeTokens);

router.put(
  '/token/:tokenId/status',
  protect,
  authorize('admin', 'moderator'),
  queueController.updateTokenStatus
);

module.exports = router;
