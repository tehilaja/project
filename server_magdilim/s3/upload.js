// import S3 from 'aws-s3';
const S3 = require('aws-s3');
const AWS = require("aws-sdk/global");

const bucketName = 'magdilim-organization-images';
 
const config = {
    bucketName: bucketName,
    region: 'us-east-1',
    accessKeyId: 'AKIAJKMYFIGB4B3LTU5Q',
    secretAccessKey: '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',
}
 
// const S3Client = new S3(config);
/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
 
/* This is optional */
const newFileName = 'my-awesome-file';
 
//function upload(file){
// S3Client
//     .uploadFile(file, newFileName)
//     .then(data => console.log(data))
//     .catch(err => console.error(err))
  /**
   * {
   *   Response: {
   *     bucket: "your-bucket-name",
   *     key: "photos/image.jpg",
   *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
   *   }
   * }
   */



AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:f555c51e-02d5-4ec2-b01d-21c1a5d384dd'
    })
  });



const uploadFile = (file, key) => {
    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ACL: "public-read"
      }
    });
    console.log('in upload file');
    var promise = upload.promise();
  
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
        //viewAlbum(albumName);
      },
      function(err) {
        console.log("There was an error uploading your photo: ", err.message);
      }
    );

    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }

  exports.methods = {
    uploadFile: uploadFile
  }