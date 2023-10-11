const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'snowprojectors@gmail.com',
        subject: 'Page View Notification',
        text: body.message
    };
 
    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: 'Email sent successfully.' };
    } catch (error) {
        console.error("Error sending email:", error);
        return { statusCode: 500, body: 'Email not sent.' };
    }
};
