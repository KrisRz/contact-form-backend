//@ts-nocheck
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sendEmail = require("./api/sendEmail"); // Import the router correctly

const app = express();

const corsOptions = {
  origin: "https://krisgrzepka.uk", // Ensure it's the correct domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/send-email", sendEmail); // Correct usage of sendEmail router

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
