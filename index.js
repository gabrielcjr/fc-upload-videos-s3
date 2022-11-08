const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');

class Videos {

    repo = ""

    constructor(repo)  {
        this.repo = repo
    }

    createFileVideosDuration = async () => {
        const directoryPath = path.join(__dirname, 'videos');

        let videos = ""
        const files = fs.readdirSync(directoryPath)

        for (const file of files) {
                
                const time = (await getVideoDurationInSeconds(`videos/${file}`))
                videos += this.repo + file +" " + this._formatTime(time) +"\r\n"
        }
        this._saveInFile(videos)
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

videos.createFileVideosDuration()
