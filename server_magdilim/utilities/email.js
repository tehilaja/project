const nodemailer = require('nodemailer');
const encryptor = require('../aes/encryptor').methods;

const encryptedEmail = 'b7cb2b5ca84575232f0ef8b4a01a26b121573579b4b42637'
const encryptedEmailPassword = 'b3cc2c58a345752b2f1ce5aba31d16b2';
const decryptedEmail = encryptor.decrypt(encryptedEmail);
const decryptedEmailPassword = encryptor.decrypt(encryptedEmailPassword);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: decryptedEmail,
        pass: decryptedEmailPassword,
    }
});

const sendEmail = (mailTo, cc, bcc, subject, body, attachments, callback) => { 

    var mailOptions = {
        from: decryptedEmail,
        to: mailTo,
        cc: cc,
        bcc: bcc,
        subject: subject,
        text: body,
        attachments: attachments,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (callback) callback(error, info);
        });
}

exports.methods = {
    sendEmail: sendEmail,
}