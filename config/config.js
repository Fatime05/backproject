import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // MongoDB-yə qoşuluruq
        const connect = await mongoose.connect(process.env.MONGO_URI);

        // Qoşulmanın uğurlu olduğunu bildiririk
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (err) {
        // Hər hansı bir xəta baş verərsə, xəta mesajını konsolda göstəririk
        console.error("MongoDB connection error:", err);
        process.exit(1);  // Əgər əlaqə qurulmazsa, prosesi dayandırırıq
    }
};

// MONGO_URI = mongodb+srv://xocaxovafatime:Pqpz0bnZzw4era8Q@cluster0.zjdix.mongodb.net/
// JWT = yjTSpglvD+LSxy5B0vEnZn1f7iWOKSzeWmMmP8L5s1E=