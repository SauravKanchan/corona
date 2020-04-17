require('dotenv').config()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function gitPush () {
  try {
    const { stdout, stderr } = await exec('git add -A && git commit -m "Update News" && git push')
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  } catch (err) {
    console.error(err)
  }
}

(async () => {
  let res = await axios.get(`http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4119ac59db8e4fc89b2118424f8f3363`)
  if (res.status === 200) {
    await fs.writeFile('src/data/news.json', JSON.stringify(res.data), 'utf8', (e) => {
      console.log(e)
    })
    await gitPush()
  }

})()
