const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- 1. Updated Middleware with CORS Config ---
app.use(cors({
  origin: ["https://logicmint.solutions", "http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// Gmail SMTP Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'logicmint.solution@gmail.com',
    pass: process.env.GMAIL_PASS || 'lvwx uxeo aypo xtpx'
  }
});

// Mail API Endpoint
app.post('/api/send-mail', async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, subject, and message are required" 
      });
    }

    const mailOptions = {
      from: '"LogicMint Solutions" <' + (process.env.GMAIL_USER || 'logicmint.solution@gmail.com') + '>',
      to: process.env.GMAIL_USER || 'logicmint.solution@gmail.com',
      replyTo: email,
      subject: `LogicMint Inquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #00f2fe;">New Message from ${name}</h2>
          <p><strong>User's Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}
          </p>
          <hr />
          <p style="font-size: 12px; color: #888;">This email was sent from LogicMint Solutions Contact Form.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send email. Please try again later." 
    });
  }
});

// WhatsApp/SMS API Endpoint (using Twilio or similar service)
app.post('/api/send-sms', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone and message are required" 
      });
    }

    // Check if SMS service is configured
    const smsService = process.env.SMS_SERVICE || 'twilio';
    
    if (smsService === 'twilio') {
      // Twilio configuration
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

      if (!accountSid || !authToken || !twilioPhone) {
        return res.status(400).json({ 
          success: false, 
          message: "SMS service not properly configured" 
        });
      }

      const twilio = require('twilio')(accountSid, authToken);
      
      await twilio.messages.create({
        body: message,
        from: twilioPhone,
        to: phone
      });

      res.status(200).json({ success: true, message: "SMS sent successfully!" });
    } else if (smsService === 'whatsapp') {
      // WhatsApp Business API configuration
      const whatsappToken = process.env.WHATSAPP_API_TOKEN;
      const whatsappPhoneId = process.env.WHATSAPP_PHONE_ID;

      if (!whatsappToken || !whatsappPhoneId) {
        return res.status(400).json({ 
          success: false, 
          message: "WhatsApp service not properly configured" 
        });
      }

      const response = await fetch(`https://graph.instagram.com/v18.0/${whatsappPhoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${whatsappToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body: message }
        })
      });

      if (!response.ok) {
        throw new Error('WhatsApp API error');
      }

      res.status(200).json({ success: true, message: "WhatsApp message sent successfully!" });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "No valid SMS service configured" 
      });
    }
  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send SMS. Please try again later." 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// --- 2. Fixed Port Logic for Local & Production ---
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;