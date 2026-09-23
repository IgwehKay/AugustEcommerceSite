const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
});

const sendEmail = async(options)=>{
    const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };


    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
        throw new Error("EMAIL and EMAIL_PASSWORD environment variables are required");
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`Verification email accepted by SMTP server: ${info.messageId}`);
};

module.exports = sendEmail;