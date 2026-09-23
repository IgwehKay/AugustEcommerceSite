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

const sendEmail = async(options)=>{
    const email = process.env.EMAIL;
    const password = process.env.EMAIL_PASSWORD;


    //creating email transporter

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    });


    //configure options

    const mailOptions = {
        from: "Shopsy <officialrentdirect@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    };


    await transporter.sendMail(mailOptions)
};

module.exports = sendEmail;