const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: String,
  name: { type: String, required: true },
  phone: String,
  email: String,
  password: { type: String, required: true },
  role: { type: String, default: 'patient' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

