import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId; 
    console.log("Gələn hotelId:", hotelId);  

    if (!hotelId) {
        return res.status(400).json({ message: "Otel ID tələb olunur." });
    }

    const newRoom = new Room({
        ...req.body, 
        hotelId: hotelId,  
    });

    try {
        const savedRoom = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },  
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedRoom);  
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("Silinəcək otaq ID:", id);

        const deletedRoom = await Room.findByIdAndDelete(id);
        console.log('silinecek otaq');
        

        if (!deletedRoom) {
            return res.status(404).json({ message: "Otaq tapılmadı!" });
        }

       
        await Hotel.updateMany(
            { rooms: id },
            { $pull: { rooms: id } }
        );

        res.status(200).json({ message: "Otaq uğurla silindi!" });
    } catch (error) {
        next(error);
    }
};




export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};


export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};
