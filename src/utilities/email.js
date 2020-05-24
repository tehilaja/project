const axios = require('axios');

const emailAttachementFromFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
        const attachment = {
            filename: file.name,
            path: reader.result,     //base64 encoded file           
        };
        callback(attachment);
    }

    reader.readAsDataURL(file);
}

const sendEmail = async (mailTo, cc, bcc, subject, body, attachments, callback) => {

    const response = await axios.post('/sendEmail',
        {
            mail_to: mailTo,
            cc: cc,
            bcc: bcc,
            body: body,
            subject: subject,
            attachments: attachments
        },
        { headers: { 'Content-Type': 'application/json' } });

    if (callback) {
        callback(null, response.data);
    }

}

exports.sendEmail = sendEmail;
exports.emailAttachementFromFile = emailAttachementFromFile;