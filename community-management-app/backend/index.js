const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5001;

dotenv.config();

// Optimized CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], // Allow multiple origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow credentials (cookies, authorization headers)
  preflightContinue: false, // Don’t pass preflight to next handler
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Parse incoming JSON requests
app.use(express.json({ limit: "10mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully Connected to MongoDB"))
  .catch((err) => {
    console.error("Connection to MongoDB failed:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Apply routes
app.use("/", Routes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Catch undefined routes and handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
