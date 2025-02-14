import express from 'express';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';



const router = express.Router();

// Axtarış üçün API
router.post("/search", async (req, res) => {
  const { checkInDate, checkOutDate, guestCount } = req.body;

  try {
    // Yalnız bir otel olduğu üçün "findOne" istifadə edirik
    const hotel = await Hotel.findOne(); // Tək otel olduğu üçün

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const availableRooms = []; // Müsait otaqlar
    const unavailableRooms = []; // Uyğunsuz otaqlar

    // Otaqların yoxlanması
    for (let roomId of hotel.rooms) {
      const room = await Room.findById(roomId); // Otaq məlumatları

      // Otağın uyğun olub-olmadığını yoxlayaq
      const isRoomAvailable = room.roomNumbers.some((roomNumber) => {
        return !roomNumber.unavailableDates.some(
          (unavailableDate) =>
            new Date(unavailableDate).toISOString().split('T')[0] === checkInDate.split('T')[0] ||
            new Date(unavailableDate).toISOString().split('T')[0] === checkOutDate.split('T')[0]
        );
      });

      // Uyğun otaqları yığırıq
      if (isRoomAvailable && room.maxPeople >= guestCount) {
        availableRooms.push(room);
      } else {
        unavailableRooms.push(room); // Uyğunsuz otaqları yığırıq
      }
    }

    // Nəticələri qaytarırıq
    res.json({
      availableRooms, // Müsait otaqlar
      unavailableRooms, // Uyğunsuz otaqlar
    });
  } catch (err) {
    res.status(500).json({ message: 'Error while searching for rooms', error: err });
  }
});

export default router;
