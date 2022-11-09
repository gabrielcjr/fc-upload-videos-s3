require('dotenv').config()
const AWS =require('aws-sdk');
const fs = require('fs');
const stream = require('stream');

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

const uploadFile = (file, chapter, path) => {
  // const fileContent  = fs.readFileSync(__dirname, file)
  
  const fileStream = new stream.PassThrough();
  
  const pathToS3 = path+chapter+file

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME_UPLOAD,
    Body: fileStream,
    Key: pathToS3
  }
  s3.upload(uploadParams).promise()

  return fileStream
}

const readStream = fs.createReadStream('videos/01-Sobre-sistema-de-migracoes-no-Sequelize.mp4');

readStream.pipe(uploadFile('01-Sobre-sistema-de-migracoes-no-Sequelize.mp4','5/', process.env.REPO_TYPESCRIPT))

//    ACL:'public-read'