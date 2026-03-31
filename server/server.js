require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const { router } = require("./routes/auth");
const waterbodyRoutes = require("./routes/waterbodies");
const siteRoutes = require("./routes/sites");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "cmpt315_lakewatch_project",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));


app.use("/api/auth", router);
app.use("/api/waterbodies", waterbodyRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
