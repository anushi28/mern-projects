const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo backend LIVE 🚀");
});

const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    dbName: "todolist"
  })
  .then(() => {
    console.log("MongoDB connected");

    const taskSchema = new mongoose.Schema({
      title: { type: String, required: true },
      completed: { type: Boolean, default: false }
    });

    const Task = mongoose.model("Task", taskSchema);

    app.post("/add-task", async (req, res) => {
      try {
        if (!req.body.title) {
          return res.status(400).json({ error: "Title required" });
        }

        const task = new Task({ title: req.body.title });
        await task.save();
        res.status(201).json(task);
      } catch (err) {
        console.error("ADD TASK ERROR:", err);
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/get-tasks", async (req, res) => {
      const tasks = await Task.find();
      res.json(tasks);
    });

    app.put("/complete-task/:id", async (req, res) => {
      await Task.findByIdAndUpdate(req.params.id, { completed: true });
      res.json("Completed");
    });

    app.delete("/delete-task/:id", async (req, res) => {
      await Task.findByIdAndDelete(req.params.id);
      res.json("Deleted");
    });

    app.listen(PORT, () => {
      console.log("Todo backend running on port", PORT);
    });
  })
  .catch(err => {
    console.error("MongoDB failed:", err);
    process.exit(1);
  });
