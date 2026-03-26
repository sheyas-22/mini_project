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
.catch((err) => console.log("Connection Error ❌", err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Routes
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
        console.log(error);
        res.status(500).json({ error: "Error saving data ❌" });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Server start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});