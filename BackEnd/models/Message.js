const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: String,
    senderid: { type: String, required: true },
    receiverid: { type: String, required: true },
    messageText: { type: String, required: true },
    role: { type: String },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date, default: null },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', userSchema);

