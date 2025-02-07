require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const Mailjet = require("node-mailjet");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,  // Secure API Key
  process.env.MJ_APIKEY_PRIVATE  // Secure API Secret
);

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL, // Verified sender email
            Name: name,
          },
          To: [
            {
              Email: process.env.RECIPIENT_EMAIL, // Your receiving email
              Name: "Website Contact Form",
            },
          ],
          Subject: subject,
          HTMLPart: `<p>${message}</p><br/><p>From: ${email}</p>`,
        },
      ],
    });

    const result = await request;
    res.json({ success: true, response: result.body });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
