const AWS = require('aws-sdk');
const bluebird = require('bluebird');

const bucketName = 'magdilim-organization-images';

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: 'AKIAIDIZL7DZR2ZUUZAA',
  secretAccessKey: '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',
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (file, key) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: bucketName,
    Key: key,
    ContentType: 'MIME',
  };
  s3.upload(params).promise();

  return `https://${bucketName}.s3.amazonaws.com/${key}`;
};

  exports.methods = {
    uploadFile: uploadFile
  }