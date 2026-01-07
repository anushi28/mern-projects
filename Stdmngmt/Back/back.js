require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection (RENDER SAFE)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// schema
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number,
});

const Student = mongoose.model("details", studentSchema);

// routes
app.post("/form", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send("Student added successfully");
});

app.get("/view", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete", async (req, res) => {
  const { name, course } = req.body;

  try {
    const result = await Student.findOneAndDelete({ name, course });
    if (result) {
      res.status(200).json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ message: "No matching record found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error });
  }
});

// serve frontend build ONLY if needed
app.use(express.static(path.join(__dirname, "..", "fromt", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "fromt", "build", "index.html"));
});

// listen (ONLY ONCE, ALWAYS AT END)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Student backend running on port ${PORT}`);
});
