import dotenv from 'dotenv'
import inquirer from 'inquirer'
import AWSUpload from './src/aws-upload.js'
import { questions, REPOS } from './src/cli-questions.js'
import Videos from './src/video.js'

dotenv.config()

let answers = {}

await inquirer.prompt(questions)
  .then((answer) => {
    answers = answer
  })

const REPO = REPOS[answers.repos]
const CHAPTER = answers.chapter + '/'

console.log(answers.repos)

const videos = new Videos(REPO, CHAPTER)

videos.createFileVideosDuration()

const fullLocalPath = videos.getFilesPath(true)
const fileNames = videos.getFilesPath(false)

const uploadVideos = () => {
  for (let i = 0; i !== fullLocalPath.length; i++) {
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
  for (let i = 0; i !== fullLocalPath.length; i++) {
    const awsUpload = new AWSUpload(
      REPO,
      CHAPTER,
      fileNames[i],
      fullLocalPath[i]
    )
    awsUpload.changePathToPublicRead()
  }
}

if (answers.upload === true) {
  uploadVideos()
}

if (answers.permission === true) {
  changePermission()
}
