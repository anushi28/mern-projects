require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- HEALTH CHECK (VERY IMPORTANT FOR RENDER) ---------- */
app.get("/", (req, res) => {
  res.send("Student backend is running 🚀");
});

/* ---------- DATABASE CONNECTION ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ---------- SCHEMA & MODEL ---------- */
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number,
});

const Student = mongoose.model("details", studentSchema);

/* ---------- ROUTES ---------- */

// add student
app.post("/form", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

// view students
app.get("/view", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// delete student
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

/* ---------- START SERVER (ONLY ONCE, ALWAYS LAST) ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Student backend running on port ${PORT}`);
});
