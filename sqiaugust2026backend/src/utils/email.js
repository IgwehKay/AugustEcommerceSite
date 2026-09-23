// const nodemailer = require('nodemailer');

// const sendEmail = async(options)=>{
//     const email = process.env.EMAIL?.trim();
//     const password = process.env.EMAIL_PASSWORD?.replace(/\s/g, "");

//     if (!email || !password) {
//         throw new Error("EMAIL and EMAIL_PASSWORD environment variables are required");
//     }

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: email,
//             pass: password
//         },
//         connectionTimeout: 10000,
//         greetingTimeout: 10000,
//         socketTimeout: 15000
//     });

//     const mailOptions = {
//         from: email,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Verification email accepted by SMTP server: ${info.messageId}`);
// };

// module.exports = sendEmail;


const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const email = process.env.EMAIL?.trim();
    const password = process.env.EMAIL_PASSWORD?.replace(/\s/g, '');

    if (!email || !password) {
        throw new Error('EMAIL and EMAIL_PASSWORD environment variables are required');
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        family: 4,
        auth: {
            user: email,
            pass: password,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });

    await transporter.sendMail({
        from: `Shopsy <${email}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    });
};

module.exports = sendEmail;