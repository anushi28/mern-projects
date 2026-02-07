const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Student backend LIVE 🚀");
});

/* ================= DB CONNECT ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* ================= MODEL ================= */
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number
});

const Student = mongoose.model("Student", studentSchema);

/* ================= ADD STUDENT ================= */
app.post("/form", async (req, res) => {
  try {
    const { name, course, age } = req.body;

    if (!name || !course || !age) {
      return res.status(400).json({ error: "All fields required" });
    }

    await new Student({
      name,
      course,
      age: Number(age)
    }).save();

    res.status(201).json({ message: "Student added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= VIEW STUDENTS ================= */
app.get("/view", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

/* ================= DELETE STUDENT BY ID ================= */
app.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
