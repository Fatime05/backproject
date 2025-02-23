import Reservation from "../models/Reservation.js"; 
import { createError } from "../utils/error.js"; 


export const createReservation = async (req, res) => {
  try {
    const { roomType, checkIn, checkOut } = req.body;
    const userId = req.user._id; 

    const newReservation = new Reservation({
      userId,
      roomType,
      checkIn,
      checkOut,
      status: 'Pending', 
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};


export const getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id; 
    
    const reservations = await Reservation.find({ userId });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
