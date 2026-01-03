const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 5000;

// ===== MONGODB CONNECTION =====
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
connectDB();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== MONGOOSE MODELS =====
const User = mongoose.model("User", new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  score: { type: Number, default: 0 }
}));

const Question = mongoose.model("Question", new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: Number,
  topic: String
}));

const Score = mongoose.model("Score", new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  topic: { type: String, required: true }
}));

// ===== ROUTES =====


// ✅ Register a User (role = "user")
app.post("/api/auth/register-user", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const user = new User({ username, password, role: "user" });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("User registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Register an Admin (role = "admin")
app.post("/api/auth/register-admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required." });
    }

    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const admin = new User({ username, password, role: "admin" });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    console.error("Admin registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login as User
app.post("/api/auth/login-user", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password, role: "user" });
  if (!user) {
    return res.status(401).json({ message: "Invalid user credentials" });
  }

  res.status(200).json({ message: "User login successful", role: "user" });
if (response.ok) {
  alert(result.message);

  // 👉 Paste this line here
  localStorage.setItem("username", username);

  // Redirect based on role
  window.location.href = role === "admin" ? "admin.html" : "quiz.html";
}

});

// ✅ Login as Admin
app.post("/api/auth/login-admin", async (req, res) => {
  const { username, password } = req.body;

  const admin = await User.findOne({ username, password, role: "admin" });
  if (!admin) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  res.status(200).json({ message: "Admin login successful", role: "admin" });
});

// Add a Question (Admin)
app.post("/api/questions", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to add question", error: err.message });
  }
});

// Get Topics
app.get("/api/questions/topics", async (req, res) => {
  try {
    const topics = await Question.distinct("topic");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Questions by Topic
app.get("/api/questions/:topic", async (req, res) => {
  try {
    const topic = req.params.topic;
    const questions = await Question.find({ topic });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// Save Score
app.post("/api/score", async (req, res) => {
  try {
    const { username, score, topic } = req.body;
    const newScore = new Score({ username, score, topic });
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving score" });
  }
});

// Get All Scores
app.get("/api/score", async (req, res) => {
  try {
    const scores = await Score.find({});
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scores" });
  }
});

// Get Admin List of Users and Scores
app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find({}, "username score");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// ===== FRONTEND STATIC SERVE =====
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "home.html"));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
