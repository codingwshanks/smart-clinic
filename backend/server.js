
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Appointment = require("./models/Appointment");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;


const doctors = {
  1: { name: "Dr. Shashank", service: "Physiotherapy" },
  2: { name: "Dr. Kapoor", service: "Pain Management" },
  3: { name: "Dr. Sahil", service: "Sports Injury" },
  4: { name: "Dr. Sharma", service: "Spine Care" },
  5: { name: "Dr. Mehta", service: "Rehabilitation" },

  6: { name: "Dr. Riya", service: "Physiotherapy" },
  7: { name: "Dr. Malhotra", service: "Pain Management" },
  8: { name: "Dr. Arjun", service: "Sports Injury" },
  9: { name: "Dr. Verma", service: "Spine Care" },
  10: { name: "Dr. Neha", service: "Rehabilitation" },

  11: { name: "Dr. Patel", service: "Orthopedic Care" },
  12: { name: "Dr. Desai", service: "Orthopedic Care" },
  13: { name: "Dr. Rao", service: "Neurological Rehabilitation" },
  14: { name: "Dr. Iyer", service: "Neurological Rehabilitation" },
  15: { name: "Dr. Shah", service: "Chiropractic Care" },
  16: { name: "Dr. Karan", service: "Chiropractic Care" },
  17: { name: "Dr. Joshi", service: "Geriatric Physiotherapy" },
  18: { name: "Dr. Anjali", service: "Geriatric Physiotherapy" },
  19: { name: "Dr. Gupta", service: "Occupational Therapy" },
  20: { name: "Dr. Priya", service: "Occupational Therapy" }
};


const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:00 PM"
];

// Test API
app.get("/", (req, res) => {
  res.send("Smart Clinic Backend is Running");
});

// Get booked appointments without patient details
app.get("/api/appointments/availability", async (req, res) => {
  try {
    const { date } = req.query;

    const filter = {
      status: "Confirmed"
    };

    if (date) {
      filter.date = date;
    }

    const appointments = await Appointment.find(filter)
      .select("doctorId date time -_id");

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch appointments"
    });
  }
});

// Book a new appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const {
      patientName,
      doctorId,
      date,
      time
    } = req.body;

    const doctor = doctors[doctorId];

    if (
      typeof patientName !== "string" ||
      !patientName.trim() ||
      patientName.length > 100 ||
      !doctor ||
      typeof doctor.name !== "string" ||
      typeof date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !timeSlots.includes(time)
    ) {
      return res.status(400).json({
        message: "Invalid appointment details"
      });
    }

    // Validate calendar date
    const parsedDate = new Date(`${date}T00:00:00Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({
        message: "Invalid appointment date"
      });
    }

    // Clinic operates in Indian Standard Time
    const [clock, period] = time.split(" ");
    const [hours, minutes] = clock.split(":").map(Number);

    const hour = (hours % 12) +
      (period === "PM" ? 12 : 0);

    const bookingTime = new Date(
      `${date}T${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+05:30`
    );

    if (bookingTime <= new Date()) {
      return res.status(400).json({
        message: "Cannot book a past appointment"
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: "Confirmed"
    });

    if (existingAppointment) {
      return res.status(409).json({
        message: "This time slot is already booked"
      });
    }

    const appointment = await Appointment.create({
      patientName: patientName.trim(),
      doctorId,
      doctorName: doctor.name,
      service: doctor.service,
      date,
      time,
      status: "Confirmed"
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: appointment._id
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        message: "This time slot is already booked"
      });
    }

    res.status(500).json({
      message: "Unable to book appointment"
    });
  }
});

// MongoDB Connection
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Appointment.init();

    console.log("MongoDB Connected Successfully");

    app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

  } catch (error) {
    console.error("Connection Error:", error.message);
    process.exit(1);
  }
}

startServer();
