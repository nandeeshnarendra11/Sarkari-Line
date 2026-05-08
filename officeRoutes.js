const express = require('express');
const router = express.Router();
const officeController = require('../controllers/officeController');
const { protect, authorize } = require('../middleware/auth');
const { validateOffice, handleValidationErrors } = require('../middleware/validation');

// Public routes
router.get('/', officeController.getAllOffices);
router.get('/search', officeController.searchOffices);
router.get('/:officeId', officeController.getOffice);
router.get('/nearby/:officeId', officeController.getNearbyOffices);

// Protected routes - Admin only
router.post('/', protect, authorize('admin'), validateOffice, handleValidationErrors, officeController.createOffice);

router.put('/:officeId', protect, authorize('admin', 'moderator'), officeController.updateOffice);

router.post('/:officeId/update-status', protect, authorize('admin', 'moderator'), officeController.updateOfficeStatus);

router.get('/:officeId/analytics', protect, authorize('admin', 'moderator'), officeController.getOfficeAnalytics);

module.exports = router;
