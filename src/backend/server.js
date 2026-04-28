const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- 1. Updated Middleware with CORS Config ---
app.use(cors({
  origin: ["https://logicmint.solutions", "http://localhost:5173"], // Tamara Frontend ni URL ahiya add karo
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

// Gmail SMTP Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'logicmint.solution@gmail.com', 
    pass: 'lvwx uxeo aypo xtpx' // Aa password secure rakhvo (Dotenv vaparvu vadhare saru)
  }
});

// Mail API Endpoint
app.post('/api/send-mail', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: '"LogicMint Solutions" <logicmint.solution@gmail.com>', 
    to: 'logicmint.solution@gmail.com', 
    replyTo: email, 
    subject: `LogicMint Inquiry: ${subject || 'No Subject'}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #00f2fe;">New Message from ${name}</h2>
        <p><strong>User's Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          <strong>Message:</strong><br/>${message}
        </p>
        <hr />
        <p style="font-size: 12px; color: #888;">This email was sent from LogicMint Solutions Contact Form.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email Sent Successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// --- 2. Fixed Port Logic for Local & Production ---
const PORT = process.env.PORT || 5000;

// Vercel serverless functions mate app.listen local ma j chalvu joie
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Vercel mate exports jaruri che
module.exports = app;