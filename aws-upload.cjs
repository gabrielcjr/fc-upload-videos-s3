require('dotenv').config()
const AWS = require('aws-sdk');
const stream = require('stream');
const fs = require('fs');
const { LexModelBuildingService } = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class AWSUpload {

    S3PathToRepo = ""
    chapter = ""
    fileName = ""
    videosLocalPath = ""

    constructor(S3PathToRepo, chapter, fileName, videosLocalPath) {
        this.S3PathToRepo = S3PathToRepo
        this.chapter = chapter
        this.fileName = fileName
        this.videosLocalPath = videosLocalPath

    }

    uploadVideos() {

        const fileStream = new stream.PassThrough();

        const pathToS3 = this.S3PathToRepo + this.chapter + this.fileName

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME_UPLOAD,
            Body: fileStream,
            Key: pathToS3
        }
        console.log(`Uploading to ${pathToS3}`)
        s3.upload(uploadParams).promise()

        const readStream = fs.createReadStream(this.videosLocalPath);

        readStream.pipe(fileStream)
    }

    changePathToPublicRead() {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME_READ,
            Prefix: this.S3PathToRepo + this.chapter + this.fileName
        }
        s3.listObjectsV2(params, function (err, data) {
            if (err) console.log(err, err.stack)
            let contents = data.Contents
            contents.forEach(function (content, index) {
                console.log(content.Key + " " + index + " files permission changed")
                s3.putObjectAcl({
                    Bucket: process.env.AWS_BUCKET_NAME_READ,
                    Key: content.Key,
                    AccessControlPolicy: {
                        Grants: [
                            {
                                Grantee: {
                                    Type: 'CanonicalUser',
                                    DisplayName: 'wesleywillians',
                                    ID: 'a3edb89dc8762b1d543412e1b0999c8b17e8a1e94c3694bf2e35d4b61499419d',

                                },
                                Permission: 'FULL_CONTROL'
                            },
                            {
                                Grantee: {
                                    Type: "Group",
                                    URI: 'http://acs.amazonaws.com/groups/global/AllUsers',
                                },
                                Permission: "READ",
                            }
                        ],
                        Owner: {
                            DisplayName: 'wesleywillians',
                            ID: 'a3edb89dc8762b1d543412e1b0999c8b17e8a1e94c3694bf2e35d4b61499419d',
                        }
                    }
                }).promise()
            });

            if (data.IsTruncated) {
                this.params.ContinuationToken = data.NextContinuationToken;
                console.log("get further list...");
                listAllKeys();
            }
        })
    }
}


module.exports = AWSUpload