// IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// INIT APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB (UPDATED - NO deprecated options)
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err));

// SCHEMA
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// MODEL
const Contact = mongoose.model("Contact", contactSchema);

// ROUTES

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// CONTACT FORM ROUTE
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required ⚠️" });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(200).json({
      message: "Message saved successfully ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

// START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});