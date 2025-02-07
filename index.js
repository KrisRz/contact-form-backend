require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sendEmail = require("./sendEmail");

const app = express();

// ✅ Allow CORS for local development (127.0.0.1:5500) and live website
const corsOptions = {
  origin: ["http://127.0.0.1:5500", "https://krisgrzepka.uk"], // Allow both local and deployed frontends
  methods: "POST",
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Setup API Route for sending emails
app.use("/api/send-email", sendEmail);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
