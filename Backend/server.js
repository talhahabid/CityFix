import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Import the database connection

dotenv.config();  // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
