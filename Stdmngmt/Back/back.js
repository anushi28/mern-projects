
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const{MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017/studentData"
const databse = 'studentData'
const client = new MongoClient(url);
async function getdata() {
    let result = await client.connect();
    let db = result.db(databse);
    return db.collection('details')
}

module.exports = getdata;

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'fromt', 'build')));
mongoose.connect('mongodb://localhost:27017/studentData');

const studentSchema = new mongoose.Schema({
    name: String,
    course: String,
    age: Number
});

const Student = mongoose.model('details', studentSchema);

app.post('/form', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send("Student added successfully");
});

app.get('/view', async (req, res) => {
    try {
        const data = await Student.find();
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'fromt', 'build', 'index.html'));
});


app.delete('/delete', async (req, res) => {
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

app.listen(port, () => console.log("Server running"));


