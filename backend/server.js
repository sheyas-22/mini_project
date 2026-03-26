// Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected ✅"))
.catch((err) => console.log("MongoDB Error ❌", err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Routes

// Test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Contact form route
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.json({ message: "Message saved successfully ✅" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save data ❌" });
    }
});

// ✅ IMPORTANT: PORT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});