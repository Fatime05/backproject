import express from "express"; // express-i import et
import { createReservation, getUserReservations } from "../controllers/reservation.js"; // controller funksiyalarını import et

const router = express.Router();

// Yalnız authenticated istifadəçilər üçün
router.post("/", createReservation);  // Yeni rezervasiya yaratmaq
router.get("/", getUserReservations);  // İstifadəçinin bütün rezervasiyalarını almaq

export default router; // ESM ilə router-i export et

