const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todolist")

const taskSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('data', taskSchema);

app.post('/add-task', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send("Task added successfully");
});

app.get('/get-tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put('/complete-task/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { completed: true });
    res.send("Task marked as completed");
});

app.delete('/delete-task/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
});

app.listen(3000, () => console.log("Server running"));