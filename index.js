require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sendEmail = require("./api/sendEmail");

const app = express();

// ✅ Allow CORS for local development (127.0.0.1:5500) and live website
const corsOptions = {
  origin: ["https://krisgrzepka.uk", "http://localhost:5500", "http://127.0.0.1:5500"],
  methods: "POST",
  allowedHeaders: ["Content-Type"],
};

app.use(cors()); // Allow all origins temporarily  --  app.use(cors(corsOptions));
app.use(express.json());

// ✅ Setup API Route for sending emails
app.use("/api/send-email", sendEmail);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
