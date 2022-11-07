const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');

class Videos {

    createFileVideosDuration = async () => {
        const directoryPath = path.join(__dirname, 'videos');

        let videos = ""
        const files = fs.readdirSync(directoryPath)

        for (const file of files) {
                videos += file +" " + (await getVideoDurationInSeconds(`videos/${file}`)).toFixed(0)+"\r\n"
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

        const minutesFraction = seconds/60

        console.log(minutesFraction)
    }


}

const videos = new Videos()

videos.createFileVideosDuration()
