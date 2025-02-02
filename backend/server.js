import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import authRoutes from './routes/auth.js'; 
import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Database Connection
mongoose.connect("mongodb+srv://polbesalu:ZLDD5aYPMnRCg0H0@blogappcluster.pkqbd.mongodb.net/?retryWrites=true&w=majority&appName=BlogAppCluster")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/routes/auth', authRoutes); // Using auth routes
app.use('/posts', postRoutes); // Using post routes
app.use("/api/auth", authRoutes);


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
