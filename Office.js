const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide office name'],
      trim: true,
    },
    officeType: {
      type: String,
      enum: [
        'District Collectorate',
        'Passport Office',
        'Aadhar Centre',
        'Land Records',
        'Ration Card Office',
        'Birth/Death Registry',
        'Driving License Office',
        'Vehicle Registration',
        'Tax Office',
        'Police Station',
      ],
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    taluk: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    operatingHours: {
      opening: {
        type: String, // HH:MM format
        default: '09:00',
      },
      closing: {
        type: String,
        default: '17:00',
      },
    },
    workingDays: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    services: {
      type: [String],
      enum: [
        'Passport',
        'Aadhar',
        'Ration Card',
        'Birth Certificate',
        'Death Certificate',
        'Land Records',
        'Driving License',
        'Vehicle Registration',
        'Tax Counseling',
        'Document Verification',
      ],
    },
    averageWaitTime: {
      type: Number, // in minutes
      default: 30,
    },
    currentWaitTime: {
      type: Number, // Real-time wait time
      default: 30,
    },
    maxQueue: {
      type: Number, // Max tokens per day
      default: 100,
    },
    status: {
      type: String,
      enum: ['open', 'busy', 'partial', 'closed'],
      default: 'open',
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    officialWebsite: {
      type: String,
    },
    tokenGenerationSystem: {
      type: String,
      enum: ['manual', 'automatic', 'online'],
      default: 'manual',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
officeSchema.index({ state: 1, district: 1, taluk: 1 });
officeSchema.index({ officeType: 1 });
officeSchema.index({ status: 1 });

// Method to update current wait time
officeSchema.methods.updateWaitTime = async function () {
  const QueueToken = mongoose.model('QueueToken');
  const today = new Date().setHours(0, 0, 0, 0);
  const waitingTokens = await QueueToken.countDocuments({
    office: this._id,
    status: { $in: ['waiting', 'called'] },
    date: new Date(today),
  });

  this.currentWaitTime = Math.max(15, Math.ceil(waitingTokens * 0.75)); // Rough estimate
  return this.save();
};

// Method to check if office is currently open
officeSchema.methods.isCurrentlyOpen = function () {
  const now = new Date();
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][now.getDay()];

  if (!this.workingDays.includes(dayName)) return false;

  const [openHour, openMin] = this.operatingHours.opening.split(':').map(Number);
  const [closeHour, closeMin] = this.operatingHours.closing.split(':').map(Number);

  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;
  const currentTime = now.getHours() * 60 + now.getMinutes();

  return currentTime >= openTime && currentTime < closeTime;
};

module.exports = mongoose.model('Office', officeSchema);
