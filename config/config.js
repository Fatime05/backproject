import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (err) {
        
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    }
};

// MONGO_URI = mongodb+srv://xocaxovafatime:Pqpz0bnZzw4era8Q@cluster0.zjdix.mongodb.net/
// JWT = yjTSpglvD+LSxy5B0vEnZn1f7iWOKSzeWmMmP8L5s1E=