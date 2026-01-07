const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// health check (DO NOT REMOVE)
app.get("/", (req, res) => {
  res.send("Student backend LIVE 🚀");
});

// MongoDB (NON-BLOCKING, timeout safe)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// schema
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number
});

const Student = mongoose.model("details", studentSchema);

// routes
app.post("/form", async (req, res) => {
  await new Student(req.body).save();
  res.json({ message: "Student added" });
});

app.get("/view", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

app.delete("/delete", async (req, res) => {
  const { name, course } = req.body;
  await Student.findOneAndDelete({ name, course });
  res.json({ message: "Deleted" });
});

// start server (ONLY ONCE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Student backend running on port", PORT);
});
