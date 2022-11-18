import dotenv from 'dotenv'
import { getVideoDurationInSeconds } from 'get-video-duration'
import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer'
import AWSUpload from './aws-upload.js'
import { questions, REPOS } from './cli-questions.js'

dotenv.config()

let answers = {}

await inquirer.prompt(questions)
  .then((answer) => {
    answers = answer
  })

const REPO = REPOS[answers.repos]
const CHAPTER = answers.chapter + '/'

console.log(answers.repos)

class Videos {
  repo = ''
  chapter = ''

  constructor (repo, chapter) {
    this.repo = repo
    this.chapter = chapter
  }

  createFileVideosDuration = async () => {
    if (this.repo === '' || this.chapter === '') {
      console.log('Escolha o repositório e/ou o capítulo')
      process.exit(1)
    }
    this._renameFiles()

    const files = this.getFilesPath(false)
    let videos = ''

    for (const file of files) {
      const time = (await getVideoDurationInSeconds(`videos/${file}`))
      videos += this.repo + this.chapter + file + ' ' + this._formatTime(time) + '\r\n'
    }
    this._saveInFile(videos)
    console.log('Arquivo gerado com sucesso')
  }

  getFilesPath (completePath) {
    const directoryPath = path.join(path.resolve(), 'videos')
    const fileNames = fs.readdirSync(directoryPath)
    if (completePath === false) {
      return fileNames
    }
    if (completePath === true) {
      const result = []
      fileNames.forEach(element => {
        result.push(`videos/${element}`)
      })
      return result
    }
  }

  _saveInFile = (videos) => {
    fs.writeFileSync('videos.txt', videos, function (err) {
      if (err) return console.log(err)
      console.log(`Video ${videos} added`)
    })
  }

  _formatTime = (seconds) => {
    const dateObject = new Date(seconds * 1000)

    const videoMinutes = dateObject.getUTCMinutes()

    const videoSeconds = dateObject.getUTCSeconds()

    return videoMinutes.toString().padStart(2, '0') + ':' +
            videoSeconds.toString().padStart(2, '0')
  }

  _filenameNormalized = (file) => {
    const map = {
      a: 'á|à|ã|â',
      A: 'Á|À|Ã|Â',
      e: 'é|ê',
      E: 'É|Ê',
      i: 'í',
      I: 'Í',
      o: 'ó|õ|ô',
      O: 'Ó|Õ|Ô',
      u: 'ú',
      U: 'Ú',
      c: 'ç',
      C: 'Ç',
      '-': ' '
    }

    let str = file
    for (const i in map) {
      str = str.replace(new RegExp(map[i], 'g'), i)
    }
    return str
  }

  _renameFiles () {
    this._orderByLastModified()
    const files = this.getFilesPath(true)
    files.forEach((file, index) => {
      fs.renameSync(file, `${this._filenameNormalized(file)}`)
    })
  }

  _orderByLastModified () {
    const dir = './'
    const files = this.getFilesPath(true)
    files.sort((a, b) => {
      return fs.statSync(dir + a).mtime.getTime() -
                fs.statSync(dir + b).mtime.getTime()
    })
  }
}

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
