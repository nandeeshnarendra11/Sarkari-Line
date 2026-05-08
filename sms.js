const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send SMS via Twilio
 * @param {string} to - Recipient phone number with country code (e.g., +919876543210)
 * @param {string} message - SMS message content
 * @returns {Promise} - Twilio message response
 */
const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    console.log(`SMS sent successfully. SID: ${response.sid}`);
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    throw error;
  }
};

/**
 * Send OTP via SMS
 * @param {string} to - Recipient phone number
 * @param {string} otp - One-time password
 * @returns {Promise}
 */
const sendOTP = async (to, otp) => {
  const message = `🔐 Sarkari Line OTP: ${otp}. Valid for 10 minutes. Do not share with anyone.`;
  return sendSMS(to, message);
};

/**
 * Send Registration Confirmation SMS
 * @param {string} to - Recipient phone number
 * @param {object} userData - User data object
 * @returns {Promise}
 */
const sendRegistrationSMS = async (to, userData) => {
  const message = `✅ Welcome to Sarkari Line, ${userData.firstName}! Your registration is confirmed. Login ID: ${userData.email}. Visit: https://sarkariline.com`;
  return sendSMS(to, message);
};

/**
 * Send Queue Status Update SMS
 * @param {string} to - Recipient phone number
 * @param {object} queueData - Queue information
 * @returns {Promise}
 */
const sendQueueStatusSMS = async (to, queueData) => {
  const message = `📍 Sarkari Line Update: Your token #${queueData.tokenNumber} at ${queueData.officeName} is now being called. Wait time: ${queueData.waitTime} mins. Come immediately!`;
  return sendSMS(to, message);
};

/**
 * Send Appointment Reminder SMS
 * @param {string} to - Recipient phone number
 * @param {object} appointmentData - Appointment details
 * @returns {Promise}
 */
const sendAppointmentReminderSMS = async (to, appointmentData) => {
  const message = `📅 Reminder: Your appointment at ${appointmentData.officeName} is scheduled for ${appointmentData.date} at ${appointmentData.time}. Reach 15 mins early!`;
  return sendSMS(to, message);
};

module.exports = {
  sendSMS,
  sendOTP,
  sendRegistrationSMS,
  sendQueueStatusSMS,
  sendAppointmentReminderSMS,
};
