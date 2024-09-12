import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: Number,
    unique: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  // Reference to the patient who made the appointment
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',  // Reference to the doctor with whom the appointment is booked
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String, // Example: '09:00-10:00'
    required: true
  },
  serviceType: {
    type: String, // Example: 'General Check-up', 'Pediatric Care'
  },
  status: {
    type: String,
    enum: ['Pending', 'Scheduled', 'Rescheduled', 'Completed', 'Cancelled', 'Missed'],
    default: 'Pending'
  },
  reasonForVisit: {
    type: String,
    default: ''
  },
  prescription: [{
    medicineName: String,
    dosage: String,
    duration: String // Example: '1 week', '5 days'
  }],
  followUpAppointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  isEmergency: {
    type: Boolean,
    default: false
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled'],
    default: 'Pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User (either admin or clinic) who created the appointment
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // User who last updated the appointment
  }
}, { timestamps: true });

// Apply the auto-increment plugin to the appointmentSchema
appointmentSchema.plugin(AutoIncrement, { inc_field: 'appointmentId', start_seq: 1 });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
