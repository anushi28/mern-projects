const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check (RENDER NEEDS THIS FAST RESPONSE)
app.get("/", (req, res) => {
  res.send("Todo backend LIVE 🚀");
});

// ✅ MongoDB Atlas connection (NON-BLOCKING)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err.message));

// schema
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// routes
app.post("/add-task", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    if (!req.body || !req.body.title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const task = new Task({
      title: req.body.title,
      completed: false
    });

    const savedTask = await task.save();
    console.log("SAVED TASK:", savedTask);

    res.status(201).json(savedTask);
  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/get-tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/complete-task/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { completed: true });
    res.json({ message: "Task marked as completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delete-task/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ START SERVER (ONLY ONCE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Todo backend running on port", PORT);
});
