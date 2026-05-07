const express = require('express');
const DoctorsData = require('../models/DoctorsData');
const router = express.Router();
const Message = require('../models/Message');
const protect = require('../middleware/authmiddleware');

// ---------------- test route ----------------
router.get('/', (req, res) => {
    res.json({ message: "Messages route working" });
});

// ---------------- to get all doctors in messages ----------------
router.get('/allDoctorsData' , protect, async (req, res) => {
  try {
    const doctors = await DoctorsData.find()
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- get unread count for a user ----------------
router.get("/unread/:userid", protect, async (req, res) => {
  try {
    const { userid } = req.params;
    const unreadCount = await Message.countDocuments({
      receiverid: userid,
      isRead: false
    });
    res.json({ unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- mark message as read ----------------
router.put("/markRead/:messageId", protect, async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- mark all messages as read for a conversation ----------------
router.put("/markAllRead/:senderid/:receiverid", protect, async (req, res) => {
  try {
    const { senderid, receiverid } = req.params;
    await Message.updateMany(
      { senderid: receiverid, receiverid: senderid, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    res.json({ message: "All messages marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- to send a message ----------------
router.post("/sendMessage", protect, async (req, res) => {
  try {
    const { userid, senderid, receiverid, messageText } = req.body;

    if (!senderid || !receiverid || !messageText) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newMessage = new Message({
      userid,
      senderid,
      receiverid,
      messageText,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- to get messages history between two users ----------------
router.get("/:senderid/:receiverid", protect, async (req, res) => {
  try {
    const { senderid, receiverid } = req.params;
    const messages = await Message.find({
      $or: [
        { senderid, receiverid },
        { senderid: receiverid, receiverid: senderid },
      ],
    }).sort({ timestamp: 1 }); // oldest → newest
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;