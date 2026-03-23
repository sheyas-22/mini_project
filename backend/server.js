const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
  .then(() => console.log("MongoDB Connected"));

app.post("/contact", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Message sent successfully!" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});