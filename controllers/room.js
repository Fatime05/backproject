import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// 📌 Otaq yaratmaq
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;  // URL-dən `hotelId` alırıq
    console.log("Gələn hotelId:", hotelId);  // Debug üçün

    if (!hotelId) {
        return res.status(400).json({ message: "Otel ID tələb olunur." });
    }

    // Yeni otağı yaratmaq
    const newRoom = new Room({
        ...req.body,  // Məlumatları daxil edirik
        hotelId: hotelId,  // ✅ hotelId sahəsini modelə əlavə edirik
    });

    try {
        // Yeni otağı bazada saxlayırıq
        const savedRoom = await newRoom.save();

        // Otaq yaradıldıqdan sonra, bu otağı otelin `rooms` sahəsinə əlavə edirik
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },  // Oteldəki otaqlar siyahısına əlavə edirik
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedRoom);  // Yeni yaradılan otağı geri qaytarırıq
    } catch (err) {
        next(err);
    }
};

// 📌 Otaq yeniləmək
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

// 📌 Otaq silmək
export const deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("Silinəcək otaq ID:", id);

        const deletedRoom = await Room.findByIdAndDelete(id);
        console.log('silinecek otaq');
        

        if (!deletedRoom) {
            return res.status(404).json({ message: "Otaq tapılmadı!" });
        }

        // **Otağın aid olduğu oteli tapıb, həmin otelin rooms array-dan silirik**
        await Hotel.updateMany(
            { rooms: id },
            { $pull: { rooms: id } }
        );

        res.status(200).json({ message: "Otaq uğurla silindi!" });
    } catch (error) {
        next(error);
    }
};



// 📌 Tək otağı əldə etmək
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

// 📌 Bütün otaqları əldə etmək
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};
