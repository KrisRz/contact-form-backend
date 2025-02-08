require("dotenv").config();
const express = require("express");
const Mailjet = require("node-mailjet");

const router = express.Router();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // ✅ Check if all required fields are provided
  if (!name || !email || !subject || !message) {
    console.log("❌ Missing form data:", { name, email, subject, message });
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    console.log("📨 Sending email via Mailjet...");
    
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: "Website Contact Form",
          },
          To: [
            {
              Email: process.env.RECIPIENT_EMAIL,
              Name: "Kris Rzepka",
            },
          ],
          Subject: subject,
          HTMLPart: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
        },
      ],
    });

    const result = await request;
    console.log("✅ Email sent successfully:", result.body);
    res.json({ success: true, response: result.body });

  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

module.exports = router;
