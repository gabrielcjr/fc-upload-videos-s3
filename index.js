const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');


(async () => {
const directoryPath = path.join(__dirname, 'videos');

global.videos = []

const files = fs.readdirSync(directoryPath)

for (const file of files) {
        videos.push(
            {
                files: (await getVideoDurationInSeconds(`videos/${file}`)).toFixed(0)
            })

}

console.log(videos)
})()

