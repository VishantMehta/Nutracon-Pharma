const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));
//apna mail 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tabishfarhan853@gmail.com",       
    pass: "jluk zaje zfwo chhu"     
  }
});


transporter.verify((error) => {
    if (error) {
        console.error('SMTP ERROR:', error);
    } else {
        console.log('SMTP READY: Server can send emails');
    }
});

app.post('/submit-form', async (req, res) => {
    const { first_name, last_name, user_email, subject, message } = req.body;


    // error check 
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
            from: `${first_name} ${last_name} <${user_email}>`,
            to: 'info@nutraconpharma.com',
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
