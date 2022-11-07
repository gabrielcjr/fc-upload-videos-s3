const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'videos');

var videos = []

fs.readdir(directoryPath, async function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    for (const file of files) {
        await getVideoDurationInSeconds(`videos/${file}`).then((duration) => {
            videos.push({file: duration.toFixed(0)})
          })
    };
});

console.log(videos)