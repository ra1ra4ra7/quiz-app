require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Score = require("./models/Score");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(express.static("public"));

// IMPORTANT: start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
console.log("URI:", process.env.MONGO_URI);

app.post("/save-score", async (req, res) => {
    const { name, score } = req.body;

    const newScore = new Score({ name, score });
    await newScore.save();

    res.json({ message: "Score saved!" });
});

app.get("/scores", async (req, res) => {
    const scores = await Score.find().sort({ score: -1 }).limit(5);
    res.json(scores);
});
