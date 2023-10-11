const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ferreradaniel785@gmail.com',
            pass: 'Ferrera@1' // Consider using environment variables for security
        }
    });

    const mailOptions = {
        from: 'ferreradaniel785@gmail.com',
        to: 'snowprojectors@gmail.com',
        subject: 'Page View Notification',
        text: body.message
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: 'Email sent successfully.' };
    } catch (error) {
        return { statusCode: 500, body: 'Email not sent.' };
    }
};
