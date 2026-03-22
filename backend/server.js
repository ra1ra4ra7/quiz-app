const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('DB Error:', err));

const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

app.post('/api/scores', async (req, res) => {
  const { name, score } = req.body;
  const newScore = new Score({ name, score });
  await newScore.save();
  res.json({ message: 'Score saved!' });
});

app.get('/api/scores', async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});app.use(express.json());

let scores = []; // temporary storage

app.post("/submit-score", (req, res) => {
  const { name, score } = req.body;

  scores.push({ name, score });

  res.json({ message: "Score saved!" });
}); 
app.get("/scores", (req, res) => {
  res.json(scores);
});