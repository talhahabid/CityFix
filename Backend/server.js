import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Import the database connection
import cors from "cors";
import userRouter from "./src/routes/User.route.js";
import formRouter from "./src/routes/Form.route.js";
dotenv.config();  

const app = express();

app.use(cors());
connectDB();

app.use(express.json());
app.use("/user", userRouter);
app.use("/citizen", formRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



