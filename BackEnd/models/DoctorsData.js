const { request } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: String,
  name: { type: String, required: true },
  startingHour: String,
  endingHour: String,
  fees: Number,
  role: { type: String, default: 'doctor' },
  requestTime: String,
  appointmentDate: String,
  requeststatus: { type: String, default: 'none' },
  requestBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctors', userSchema);

