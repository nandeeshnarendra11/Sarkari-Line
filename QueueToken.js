const mongoose = require('mongoose');

const queueTokenSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: Number,
      required: true,
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Office',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceType: {
      type: String,
      enum: [
        'Passport',
        'Aadhar',
        'Ration Card',
        'Birth Certificate',
        'Death Certificate',
        'Land Records',
        'Driving License',
        'Vehicle Registration',
        'Other',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['waiting', 'called', 'in_service', 'completed', 'cancelled', 'no_show'],
      default: 'waiting',
    },
    priority: {
      type: String,
      enum: ['normal', 'senior_citizen', 'pwd', 'pregnant', 'reserved'],
      default: 'normal',
    },
    estimatedWaitTime: {
      type: Number, // in minutes
      default: 30,
    },
    actualWaitTime: {
      type: Number, // in minutes, calculated after service
      default: null,
    },
    position: {
      type: Number, // Current position in queue
      default: null,
    },
    calledTime: {
      type: Date,
      default: null,
    },
    serviceStartTime: {
      type: Date,
      default: null,
    },
    completionTime: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    feedback: {
      type: String,
      maxlength: 500,
    },
    smsNotificationSent: {
      type: Boolean,
      default: false,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: () => new Date().setHours(0, 0, 0, 0), // Today's date at midnight
    },
  },
  { timestamps: true }
);

// Index for efficient querying
queueTokenSchema.index({ office: 1, date: 1, status: 1 });
queueTokenSchema.index({ user: 1, date: 1 });
queueTokenSchema.index({ tokenNumber: 1, office: 1, date: 1 });

// Method to calculate wait time
queueTokenSchema.methods.calculateWaitTime = function () {
  if (this.completionTime && this.serviceStartTime) {
    const diff = this.completionTime - this.serviceStartTime;
    this.actualWaitTime = Math.ceil(diff / 60000); // Convert to minutes
  }
  return this.actualWaitTime;
};

// Method to send SMS notification
queueTokenSchema.methods.sendNotification = async function () {
  if (this.smsNotificationSent) return;
  const sms = require('../config/sms');
  const User = mongoose.model('User');
  const user = await User.findById(this.user);

  if (user && user.phone) {
    await sms.sendQueueStatusSMS(user.phone, {
      tokenNumber: this.tokenNumber,
      officeName: 'Government Office', // Will be populated from office ref
      waitTime: this.estimatedWaitTime,
    });
    this.smsNotificationSent = true;
  }
};

module.exports = mongoose.model('QueueToken', queueTokenSchema);
