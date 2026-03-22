const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const { MongoClient } = require("mongodb");

const uri = mongodb+srv://quizuser:123@cluster0.9soskvd.mongodb.net/?appName=Cluster0

const client = new MongoClient(uri);
let db;
async function connectDB() {
  await client.connect();
  db = client.db("quizDB");
  console.log("MongoDB connected");
}
connectDB();
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

app.get("/scores", async (req, res) => {
  const data = await db.collection("scores").find().toArray();
  res.json(data);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});app.use(express.json());

let scores = []; // temporary storage

app.post("/submit-score", async (req, res) => {
  const { name, score } = req.body;

  await db.collection("scores").insertOne({ name, score });

  res.json({ message: "Score saved!" });
});