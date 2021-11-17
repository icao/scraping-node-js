const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs-extra')

const fileConfiguration = fs.createWriteStream(
  'workbenchColorCustomizations.js'
)

async function scraping() {
  const URL = 'https://code.visualstudio.com/api/references/theme-color'
  const response = await axios.get(URL)
  const $ = cheerio.load(response.data)

  fileConfiguration.write(`export const workbench = { \n`)

  $('#main .body ul li code').each((index, element) => {
    const parameter = $(element).text()
    fileConfiguration.write(`\t'${parameter}': interpolation,\n`)
  })

  fileConfiguration.write(`} \n`)
}

scraping()
