const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const encryptor = require('../aes/encryptor').methods;
const bucketName = 'magdilim-organization-images';

const encryptedAccessKeyId = '97f60b6983714905023acb95fe34328c067e1644';
const encryptedSecretAccessKey = 'beee2d4af04d2c0a7126a5baa00413a0026f287edbb9283fbb9b56a59836fe8394ec476ea303edf4';


AWS.config.update({
  accessKeyId: encryptor.decrypt(encryptedAccessKeyId),
  secretAccessKey: encryptor.decrypt(encryptedSecretAccessKey), });

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (file, type, key) => {

  const params = {
    ACL: 'public-read',
    Body: Buffer.from(file), 
    Bucket: bucketName,
    Key: key,
    ContentType: type, };

  s3.upload(params).promise();

  return getUrlFromKey(key);
};


const getFilesFromFolder = (folder, callback) => {

  const prefix = `${folder}/`;
  
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  console.log('params: '+ JSON.stringify(params));

  s3.listObjects(params, (err, data) => {
    console.log('get files data: '+JSON.stringify(data));
    console.log('get files error: ' + JSON.stringify(err));

    if (data && data.Contents) {
      const urls = data.Contents.filter(content => content.Key !== prefix).map(content => getUrlFromKey(content.Key));
      callback(urls);
    } else {
      callback('error');
    }
  });
}

getUrlFromKey = (key) => {
  return `https://${bucketName}.s3.amazonaws.com/${key}`; 
}


exports.methods = {
  uploadFile: uploadFile,
  getFilesFromFolder: getFilesFromFolder,
 };
