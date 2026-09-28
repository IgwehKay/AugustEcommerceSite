// // const nodemailer = require('nodemailer');

// // const sendEmail = async(options)=>{
// //     const email = process.env.EMAIL?.trim();
// //     const password = process.env.EMAIL_PASSWORD?.replace(/\s/g, "");

// //     if (!email || !password) {
// //         throw new Error("EMAIL and EMAIL_PASSWORD environment variables are required");
// //     }

// //     const transporter = nodemailer.createTransport({
// //         host: "smtp.gmail.com",
// //         port: 465,
// //         secure: true,
// //         auth: {
// //             user: email,
// //             pass: password
// //         },
// //         connectionTimeout: 10000,
// //         greetingTimeout: 10000,
// //         socketTimeout: 15000
// //     });

// //     const mailOptions = {
// //         from: email,
// //         to: options.email,
// //         subject: options.subject,
// //         text: options.message
// //     };

// //     const info = await transporter.sendMail(mailOptions);
// //     console.log(`Verification email accepted by SMTP server: ${info.messageId}`);
// // };

// // module.exports = sendEmail;


// const nodemailer = require('nodemailer');
// const dns = require('node:dns').promises;

// const sendEmail = async (options) => {
//     const email = process.env.EMAIL?.trim();
//     const password = process.env.EMAIL_PASSWORD?.replace(/\s/g, '');

//     if (!email || !password) {
//         throw new Error('EMAIL and EMAIL_PASSWORD environment variables are required');
//     }

//     const [smtpHost] = await dns.resolve4('smtp.gmail.com');

//     const transporter = nodemailer.createTransport({
//         host: smtpHost,
//         port: 465,
//         secure: true,
//         tls: {
//             servername: 'smtp.gmail.com',
//         },
//         auth: {
//             user: email,
//             pass: password,
//         },
//         connectionTimeout: 10000,
//         greetingTimeout: 10000,
//         socketTimeout: 15000,
//     });

//     await transporter.sendMail({
//         from: `Shopsy <${email}>`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     });
// };

// module.exports = sendEmail;


const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY environment variable is required");
    }

    const { data, error } = await resend.emails.send({
        from: "Shopsy <onboarding@resend.dev>",
        to: [options.email],
        subject: options.subject,
        text: options.message,
    });

    if (error) {
        console.error("Resend email error:", error);
        throw new Error(error.message || "Failed to send email");
    }

    console.log(`Email sent successfully. ID: ${data.id}`);

    return data;
};

module.exports = sendEmail;
