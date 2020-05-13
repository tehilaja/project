const axios = require('axios');

const uploadFile = async (file, onSuccess, directory = null) => {

    const reader = new FileReader();

    reader.onload = async (event) => {
        const bufferAndType = base64ImageToBuffer(reader.result);

        const response = await axios.post('/upload-file',
            {
                file: bufferAndType[0],
                type: bufferAndType[1],
                key: directory ? `${directory}/${file.name}` : file.name,
            },
            { headers: { 'Content-Type': 'application/json' } });

        console.log("resp", response); onSuccess(response.data);
    }

    reader.readAsDataURL(file);
}

const base64ImageToBuffer = (str) => {    // extract content type and base64 payload from original string   
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
    const buff = Buffer.from(b64, 'base64');
    return [buff, type];
}

exports.methods = { uploadFile: uploadFile, }