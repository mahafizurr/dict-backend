const express = require("express");
const app = express();
const routes = require("./routes/routes");
const committeeRoutes = require("./routes/committeeRoutes");
const yearRoutes = require("./routes/yearRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure status code
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON requests
app.use(express.static("public")); // Serve static files

app.use("/", routes);
app.use("/api/committee", committeeRoutes); // Use committee routes
app.use("/api/year", yearRoutes); // Use year routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
