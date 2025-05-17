import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import auth from './routes/auth';
import users from './routes/users';

// setup env
dotenv.config();

// import for mongoose
import mongoose from 'mongoose';

// import for passportjs
import passport from './config/passport';

// connect to db
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(process.env.MONGODB_URI!);
  console.log(`MongoDB connected ${conn.connection.host}`);
};
connectDB();


const app = express();
// middlewares 
// -----------
app.use(express.json()); // Body parser
app.use(helmet()); // security header
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, 
})); // enable cors
app.use(cookieParser());
app.use(passport.initialize());
// no passport.session() cause we use jwt

// routes
// ------
app.use("/api/v1/auth" , auth);
app.use("/api/v1/users" , users);


const PORT = process.env.PORT || 5000  ; 

app.listen(PORT , () => {
  console.log(`Running on PORT ${PORT}`);
});

