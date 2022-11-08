const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');
const AWS =require('aws-sdk');

class Videos {

    repo = ""

    constructor(repo)  {
        this.repo = repo
    }

    // uploadToS3Bucket() {
    //     const s3 = new AWS.S3({
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    //       })
        
    //     const filename = 'the-file-name'
    //     const fileContent = fs.readFileSync(fileName)
        
    //     const params = {
    //       Bucket: process.env.AWS_BUCKET_NAME,
    //       Key: `${filename}.jpg`,
    //       Body: fileContent
    //     }
        
    //     s3.upload(params, (err, data) => {
    //       if (err) {
    //         reject(err)
    //       }
    //       resolve(data.Location)
    //     })

    // }

    createFileVideosDuration = async () => {

        const files = this.getFilesPath(false)
        let videos = ""

        for (const file of files) {
                const time = (await getVideoDurationInSeconds(`videos/${file}`))
                videos += this.repo + file +" " + this._formatTime(time) +"\r\n"
        }
        this._saveInFile(videos)
        }
    
    getFilesPath(completePath) {
        const directoryPath = path.join(__dirname, 'videos');
        if (completePath === false) {
            return fs.readdirSync(directoryPath)
        }
    }

    _saveInFile = (videos) => {
            fs.writeFileSync('videos.txt', videos, function (err) {
                if (err) return console.log(err);
                console.log(`Video ${video} added`);
    })}

    _formatTime = (seconds) => {
        const inSeconds = seconds

        const minutesFraction = Math.trunc((seconds/60))

        const secondsFraction = Math.trunc((seconds % 60))

        if (minutesFraction >= 10 && secondsFraction >= 10) {
            return `${minutesFraction}:${secondsFraction}`
        }
        if (minutesFraction < 10 && secondsFraction >= 10) {
            return `0${minutesFraction}:${secondsFraction}`
        }
        if (minutesFraction < 10 && secondsFraction < 10) {
            return `0${minutesFraction}:0${secondsFraction}`
        }
        if (minutesFraction >= 10 && secondsFraction < 10) {
            return `${minutesFraction}:0${secondsFraction}`
        }
    }
}

const videos = new Videos("code/go/15/")

// videos.createFileVideosDuration()
console.log(videos.getFilesPath(false))
