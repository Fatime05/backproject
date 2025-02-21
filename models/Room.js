import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true, // **Otel ID vacib olmalıdır**
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
