const express = require('express');
const DoctorsData = require('../models/DoctorsData');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "DoctorsData route working" });
});

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
    try {
        const { userName, startingHour, endingHour, role, fees, requestTime, appointmentDate, requeststatus, requestBy } = req.body;

        if (!userName || !startingHour || !endingHour || !fees) {
            return res.status(400).json({ error: 'Username, starting hour, ending hour, and fees are required' });
        }

        const user = new DoctorsData({name: userName, startingHour: startingHour, endingHour: endingHour, role: role, fees: fees, requestTime: requestTime, appointmentDate: appointmentDate, requeststatus: requeststatus, requestBy: requestBy });
        await user.save();

        res.json({ message: 'Doctor\'s time registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// ---------------- to get doctors  ----------------
router.get('/doctorsPersonalData' , async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const doctors = await DoctorsData.find({ name: name })
      .select('_id name startingHour endingHour role fees requeststatus requestBy appointmentDate requestTime');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ---------------- to get all doctors in patientdashboard ----------------
router.get('/allDoctorsData' , async (req, res) => {
  try {
    const doctors = await DoctorsData.find()
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Update its status ----------------
router.patch('/updateStatus/:id', async (req, res) => {
  try {
    const { requeststatus } = req.body;

    const updated = await DoctorsData.findByIdAndUpdate(
      req.params.id,
      { requeststatus },   // ONLY this field updates
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ---------------- DELETE Dr Data ----------------
router.delete("/delete/:id", async (req, res) => {
  try {

    const doctorsData = await DoctorsData.findByIdAndDelete(req.params.id);
    if (!doctorsData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;