const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false,
    }
})

const enviarEmail = (para, assunto, corpo) => {
    transporter.sendMail({
        from: `Minha Estante API <${process.env.MAIL_FROM}>`,
        to: para,
        subject: assunto,
        text: corpo
    })

    console.log('Email enviado.');
}

module.exports = enviarEmail;