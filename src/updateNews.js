require('dotenv').config()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function gitPush () {
  try {
    await exec('git add -A && git commit -m "Update News" && git push')
  } catch (err) {
    console.error(err)
  }
}

(async () => {
  let res = await axios.get(`http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4119ac59db8e4fc89b2118424f8f3363`)
  if (res.status === 200) {
    fs.writeFile('src/data/news.json', JSON.stringify(res.data), 'utf8', async (e) => {
      if (!e) {
        await gitPush()
        console.log('News Updated')
      }
    })
  }

})()
