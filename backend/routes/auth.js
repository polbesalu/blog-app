import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, provider: 'local' });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // 2️⃣ Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3️⃣ Generate JWT token
        const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



export default router;
