import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const searchRooms = async (req, res) => {
  const { checkInDate, checkOutDate, guestCount } = req.body;

  try {
    const hotel = await Hotel.findOne();
    console.log("Hotel Found:", hotel);
console.log("Hotel Rooms:", hotel.rooms);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const availableRooms = await Promise.all(hotel.rooms.map(async (roomId) => {
      const room = await Room.findById(roomId);
      if (!room) return null; 

      const isAvailable = room.roomNumbers.some((roomNumber) => {
        return !roomNumber.unavailableDates.some((unavailableDate) => {
          return (
            (new Date(unavailableDate) >= new Date(checkInDate) && new Date(unavailableDate) < new Date(checkOutDate)) ||
            (new Date(unavailableDate) > new Date(checkInDate) && new Date(unavailableDate) <= new Date(checkOutDate))
          );
        });
      });

      return isAvailable && room.maxPeople >= guestCount ? room : null;
    }));

    res.json({ availableRooms: availableRooms.filter(room => room !== null) });
  } catch (err) {
    res.status(500).json({ message: 'Error while searching for rooms', error: err });
  }
};
