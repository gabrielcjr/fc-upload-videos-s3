require('dotenv').config()
const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');
const AWSUpload = require('./aws-upload.cjs')

const REPO = process.env.REPO_TYPESCRIPT
const CHAPTER = "6/"

class Videos {

    repo = ""
    chapter = ""

    constructor(repo, chapter) {
        this.repo = repo
        this.chapter = chapter
    }

    createFileVideosDuration = async () => {

        const files = this.getFilesPath(false)
        let videos = ""

        for (const file of files) {
            const time = (await getVideoDurationInSeconds(`videos/${file}`))
            videos += this.repo + this.chapter + file + " " + this._formatTime(time) + "\r\n"
        }
        this._saveInFile(videos)
    }

    getFilesPath(completePath) {
        const directoryPath = path.join(__dirname, 'videos');
        const fileNames = fs.readdirSync(directoryPath)
        if (completePath === false) {
            return fileNames
        }
        if (completePath === true) {
            const result = []
            fileNames.forEach(element => {
                result.push(`videos/${element}`)

            });
            return result
        }
    }

    _saveInFile = (videos) => {
        fs.writeFileSync('videos.txt', videos, function (err) {
            if (err) return console.log(err);
            console.log(`Video ${video} added`);
        })
    }

    _formatTime = (seconds) => {
        const minutesFraction = Math.trunc((seconds / 60))

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

const videos = new Videos(REPO, CHAPTER)

videos.createFileVideosDuration()

const fullLocalPath = videos.getFilesPath(true)
const fileNames = videos.getFilesPath(false)

const uploadVideos = () => {
    for (i = 0; i != fullLocalPath.length; i++) {
        const awsUpload = new AWSUpload(
            REPO,
            CHAPTER,
            fileNames[i],
            fullLocalPath[i]
        )
        awsUpload.uploadVideos()
    }
}

const changePermission = () => {
    for (i = 0; i != fullLocalPath.length; i++) {
        const awsUpload = new AWSUpload(
            REPO,
            CHAPTER,
            fileNames[i],
            fullLocalPath[i]
        )
        awsUpload.changePathToPublicRead()
    }
}

// uploadVideos()

changePermission()