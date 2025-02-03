import mongoose from "mongoose";

export const connectDB = async(req,res) => {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(connect.connection.host);
    
}
// MONGO_URI = mongodb+srv://xocaxovafatime:Pqpz0bnZzw4era8Q@cluster0.zjdix.mongodb.net/