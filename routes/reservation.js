import express from "express"; 
import { createReservation, getUserReservations } from "../controllers/reservation.js"; 

const router = express.Router();

router.post("/", createReservation);  
router.get("/", getUserReservations);  

export default router; 

