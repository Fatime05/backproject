import express from 'express';
import { searchRooms } from '../controllers/searchController.js';
import { bookRoom } from '../controllers/bookingController.js';

const router = express.Router();

router.post("/search", searchRooms);
router.post("/book", bookRoom);

export default router;
