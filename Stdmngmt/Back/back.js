const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student backend LIVE 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number
});

const Student = mongoose.model("Student", studentSchema);

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

app.get("/view", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
