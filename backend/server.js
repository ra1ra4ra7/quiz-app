
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
  try {
    const { name, score } = req.body;
    const newScore = new Score({ name, score });
    await newScore.save();
    res.json({ message: 'Score saved!' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
