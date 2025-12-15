const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
console.log(typeof protect);

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send("Placement Cell Backend is running! BoomBaam");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user,
  });
});