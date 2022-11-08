require('dotenv').config()
const AWS =require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)
  
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}





