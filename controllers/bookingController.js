import Room from "../models/Room.js";

export const bookRoom = async (req, res) => {
  const { roomId, checkInDate, checkOutDate, userId } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

 
    const isAvailable = room.roomNumbers.every((roomNumber) => {
      return roomNumber.unavailableDates.every((unavailableDate) => {
        return !(
          (new Date(unavailableDate) >= new Date(checkInDate) && new Date(unavailableDate) < new Date(checkOutDate)) ||
          (new Date(unavailableDate) > new Date(checkInDate) && new Date(unavailableDate) <= new Date(checkOutDate))
        );
      });
    });

    if (!isAvailable) {
      return res.status(400).json({ message: "Room is not available for these dates" });
    }

    // Otağı rezerv et
    room.roomNumbers.forEach((roomNumber) => {
      roomNumber.unavailableDates.push(new Date(checkInDate), new Date(checkOutDate));
    });

    await room.save();

    res.status(201).json({
      message: "Room successfully booked!",
      bookedRoom: room,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error while booking the room', error: err });
  }
};

export const getAvailableRooms = async (req, res) => {
  const { checkInDate, checkOutDate } = req.query;

  try {
    
    const availableRooms = await Room.find({
      "roomNumbers.unavailableDates": {
        $not: {
          $in: [
            new Date(checkInDate),
            new Date(checkOutDate),
          ],
        },
      },
    });

    if (availableRooms.length === 0) {
      return res.status(404).json({ message: "No rooms available for these dates" });
    }

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};
