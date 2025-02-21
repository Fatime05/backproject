import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Yeni istifadəçi qeydiyyatı
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// İstifadəçi giriş
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, {
      expiresIn: '1h', // Tokenin müddəti
    });
    
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

// İstifadəçi doğrulama middleware
export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.access_token; // Giriş üçün token cookies-də saxlanılır

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await User.findById(decoded.id); // Token-dəki istifadəçi məlumatlarını tapırıq
    next();  // Middleware-də növbəti addıma keçirik
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
