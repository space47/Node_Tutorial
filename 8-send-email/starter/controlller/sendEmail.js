const nodemailer = require('nodemailer')

const sendEmail = async (req,res) => {
    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'sylvester.lockman@ethereal.email',
            pass: 'T157C6msNfRHz6VVUQ'
        }
    });

    let info = await transporter.sendMail({
        from:'"Coding Addict" <varnitgupta47@gmail.com>',
        to: 'varnitgupta1@gmail.com',
        subject: 'Hello',
        html:'<h2>Sending Emails with Node.js</h2>',
    })
    res.json({info})
}

module.exports = sendEmail