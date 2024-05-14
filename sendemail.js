const nodemailer = require('nodemailer');
require('dotenv').config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL_ID,
        pass: process.env.GOOGLE_PASS
    }
});

async function contactmailsend(usermailid) {
    await transporter.sendMail({
        from: process.env.FROM_EMAIL_ID,
        to: usermailid,
        subject: "Thankyou for reach out me",
        html: "<p>Hi,</p><p>Welcome to reach out me.</p><p>I will reach you immediatly, I am <b>UI DEVELOPER</b>.</p><p> Thank you for submitting your details</p> <p>Best regards,<br>GOWTHAM M</p>", // html body
    });
}

module.exports = { contactmailsend }