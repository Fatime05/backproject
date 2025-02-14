import Reservation from "../models/Reservation.js"; // ESM sintaksisi ilə import
import { createError } from "../utils/error.js"; // createError modulunu import

// Yeni rezervasiya əlavə et
export const createReservation = async (req, res) => {
  try {
    const { roomType, checkIn, checkOut } = req.body;
    const userId = req.user._id; // İstifadəçi identifikatoru (auth middleware istifadə olunur)

    const newReservation = new Reservation({
      userId,
      roomType,
      checkIn,
      checkOut,
      status: 'Pending', // Başlangıçta "Pending" olaraq qeyd olunur
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// Rezervasiyalarını əldə et
export const getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id; // İstifadəçi identifikatoru (auth middleware istifadə olunur)
    
    const reservations = await Reservation.find({ userId });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
