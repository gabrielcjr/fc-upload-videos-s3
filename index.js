import dotenv from 'dotenv';
import { getVideoDurationInSeconds } from 'get-video-duration'
import path from 'path';
import fs from 'fs';
import AWSUpload from './aws-upload.js'

dotenv.config()

const REPO = process.env.REPO_JAVA
const CHAPTER = "teste/"

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
        const directoryPath = path.join(path.resolve(), 'videos');
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
        const dateObject = new Date(seconds * 1000)

        const videoMinutes = dateObject.getUTCMinutes();

        const videoSeconds = dateObject.getUTCSeconds();

        return videoMinutes.toString().padStart(2, '0') + ':' +
            videoSeconds.toString().padStart(2, '0')


    }
}

const videos = new Videos(REPO, CHAPTER)

videos.createFileVideosDuration()

const fullLocalPath = videos.getFilesPath(true)
const fileNames = videos.getFilesPath(false)

const uploadVideos = () => {
    for (let i = 0; i != fullLocalPath.length; i++) {
        const awsUpload = new AWSUpload(
            REPO,
            CHAPTER,
            fileNames[i],
            fullLocalPath[i]
        )
        awsUpload.uploadVideos()
    }
}

const changePermission = async () => {
    for (let i = 0; i != fullLocalPath.length; i++) {
        const awsUpload = new AWSUpload(
            REPO,
            CHAPTER,
            fileNames[i],
            fullLocalPath[i]
        )
        await awsUpload.changePathToPublicRead()
    }
}

// uploadVideos()

// await changePermission()