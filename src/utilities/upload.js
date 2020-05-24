const axios = require('axios');

// upload raw file
const uploadFile = async (file, onSuccess, fileNamePrefix = '', directory = null) => {

    const reader = new FileReader();

    reader.onload = async (event) => {
        
        uploadDataUrlFile(reader.result, file.name, onSuccess, fileNamePrefix, directory);        
    }

    reader.readAsDataURL(file);
}

//upload base64 encoded file - which is a string of data uri
const uploadDataUrlFile = async (dataUrl, filename, onSuccess, fileNamePrefix = '', directory = null) => {

    const bufferAndType = base64ImageToBuffer(dataUrl);

    let key = directory ? `${directory}/` : '';
    key += fileNamePrefix ? `${fileNamePrefix}_` : '';
    key += filename;

    const response = await axios.post('/upload-file',
        {
            file: bufferAndType[0],
            type: bufferAndType[1],
            key: key,
        },
        { headers: { 'Content-Type': 'application/json' } });

    console.log("resp", response);
    onSuccess(response.data);

}

const base64ImageToBuffer = (str) => {    // extract content type and base64 payload from original string   
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
    const buff = Buffer.from(b64, 'base64');
    return [buff, type];
}

const getFilesFromFolder = async (folder, callback) => {
    const response = await axios.get(`/get-files-of-folder/${folder}`).then(res => {
        if (Array.isArray(res.data)) {
            callback(res.data);
        } else {
            callback(null);
        }
    });
}

exports.methods = {
    uploadFile: uploadFile,
    uploadDataUrlFile: uploadDataUrlFile,
    getFilesFromFolder: getFilesFromFolder,
}
