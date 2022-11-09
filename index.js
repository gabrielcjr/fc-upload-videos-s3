require('dotenv').config()
const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');


class Videos {

    repo = ""
    chapter = ""

    constructor(repo, chapter)  {
        this.repo = repo
        this.chapter = chapter
    }

    createFileVideosDuration = async () => {

        const files = this.getFilesPath(true)
        let videos = ""

        for (const file of files) {
                const time = (await getVideoDurationInSeconds(`videos/${file}`))
                videos += this.repo + this.chapter + file +" " + this._formatTime(time) +"\r\n"
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
            const result = fileNames.forEach(element => {
                element = `videos/${element}`
            return result
        });
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

console.log(process.env.REPO_TYPESCRIPT)

const videos = new Videos(process.env.REPO_TYPESCRIPT, "12/")

videos.createFileVideosDuration()
// console.log(videos.getFilesPath(false))
