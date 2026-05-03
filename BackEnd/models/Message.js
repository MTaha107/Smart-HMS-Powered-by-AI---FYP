const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: String,
    senderid: { type: String, required: true },
    receiverid: { type: String, required: true },
    messageText: { type: String, required: true },
    role: { type: String },
    status: {type: String},
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', userSchema);

