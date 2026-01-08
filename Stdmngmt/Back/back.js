const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ✅ CORS FIX (IMPORTANT) */
app.use(cors({
  origin: [
    "https://student-front-fawk.onrender.com" // your frontend URL
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ✅ Health check (Render needs this) */
app.get("/", (req, res) => {
  res.send("Student backend LIVE 🚀");
});

/* ✅ MongoDB connection */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });

/* ✅ Schema */
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  age: { type: Number, required: true }
});

const Student = mongoose.model("Student", studentSchema);

/* ✅ Add student */
app.post("/form", async (req, res) => {
  try {
    const { name, course, age } = req.body;

    if (!name || !course || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await new Student({ name, course, age }).save();
    res.status(201).json({ message: "Student added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ View students */
app.get("/view", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ Delete student */
app.delete("/delete", async (req, res) => {
  try {
    const { name, course } = req.body;

    const deleted = await Student.findOneAndDelete({ name, course });

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ Start server (ONLY ONCE) */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Student backend running on port", PORT);
});
