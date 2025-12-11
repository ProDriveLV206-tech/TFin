const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  senderId: String,
  senderName: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
// TTL index: messages expire 24 hours (86400 seconds) after createdAt
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
module.exports = mongoose.model('Message', MessageSchema);
