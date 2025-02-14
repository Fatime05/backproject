import mongoose from "mongoose"; // ESM sintaksisi ilə import

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // İstifadəçinin məlumatlarını əlaqələndirmək üçün
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema); // Model yaratmaq

export default Reservation; // ESM ilə export
