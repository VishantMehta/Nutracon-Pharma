const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

transporter.verify((error) => {
    if (error) {
        console.error('SMTP ERROR:', error);
    } else {
        console.log('SMTP READY: Server can send emails');
    }
});

app.post('/api/contact', async (req, res) => {
    const { first_name, last_name, user_email, subject, message } = req.body;

    const errors = {};
    if (!first_name) errors.first_name = 'First name is required';
    if (!last_name) errors.last_name = 'Last name is required';
    if (!user_email || !/^\S+@\S+\.\S+$/.test(user_email)) errors.user_email = 'Valid email is required';
    if (!subject) errors.subject = 'Subject is required';
    if (!message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    try {
        await transporter.sendMail({
            from: `"${first_name} ${last_name}" <${process.env.GMAIL_USER}>`,
            to: 'info@nutraconpharma.com',
            replyTo: user_email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${first_name} ${last_name}</p>
                <p><strong>Email:</strong> ${user_email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('FULL ERROR DETAILS:', {
            message: error.message,
            smtpError: error.response
        });
        res.status(500).json({
            success: false,
            message: 'Email server error - please try later',
            debug: error.response
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));