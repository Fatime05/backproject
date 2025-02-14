import express from "express";
import cors from 'cors';
import { configDotenv } from "dotenv";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import searchRoutes from './routes/search.js'
import reservationRoutes from './routes/reservation.js'
import authenticateUser from './routes/auth.js'
import cookieParser from "cookie-parser";
import { connectDB } from "./config/config.js";
configDotenv()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:3001", // React frontend URL
  credentials: true, // Cookie-ləri icazə vermək üçün
})) 

connectDB()

//middlewares

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use('/api/search', searchRoutes);
app.use("/api/reservations", authenticateUser, reservationRoutes);

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})


 

app.listen(6066,() => {
    console.log("backend running"); 
    
})      