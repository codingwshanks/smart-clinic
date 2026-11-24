
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true
    },

    doctorId: {
      type: Number,
      required: true
    },

    doctorName: {
      type: String,
      required: true
    },

    service: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed"
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate confirmed appointments
appointmentSchema.index(
  {
    doctorId: 1,
    date: 1,
    time: 1
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "Confirmed"
    }
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);
