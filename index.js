require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sendEmail = require("./api/sendEmail");

const app = express();

// ✅ Allow CORS for local development & live website
const corsOptions = {
  origin: ["https://krisgrzepka.uk", "http://localhost:5500", "http://127.0.0.1:5500"],
  methods: "POST",
  allowedHeaders: ["Content-Type"],
};

// 🔧 Temporarily allow all origins for testing, but switch to corsOptions when done
app.use(cors()); // Change to app.use(cors(corsOptions)) for production

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Debug: Log incoming requests before passing to the email handler
app.use((req, res, next) => {
  if (req.path === "/api/send-email") {
    console.log("📩 Incoming request:", req.body); // ✅ Log request body
  }
  next();
});

// ✅ Setup API Route for sending emails
app.use("/api/send-email", sendEmail);

// ✅ Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
