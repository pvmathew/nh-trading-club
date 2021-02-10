const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Environment Variable Setup
const dotenv = require("dotenv");
dotenv.config();

// CORS
server.use(cors());

// Bodyparser Middleware
server.use(express.json());

// MongoDB
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: MONGO_DB_NAME,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Server Side Rendering
server.get("/", (req, res) => {
  res.send("Server is up!");
});

// Routes
server.use("/api/db", require("./routes/db"));
server.use("/api/listings", require("./routes/listings"));
server.use("/api/user", require("./routes/user"));
server.use("/api/profile", require("./routes/profile"));

server.listen(process.env.PORT || 5000, () =>
  console.log("Server is running...")
);
