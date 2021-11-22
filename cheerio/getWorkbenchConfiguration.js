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

  fileConfiguration.write(`const workbench = { \n`)

  // 580 REGLAS EN TOTAL: 21 NOVIEMBRE 2021
  // SE REVISARN UNA A UNA
  // se repite: 'editorBracketPairGuide.background1'
  // por lo que son 579 reglas

  $('#main .body ul li')
    .find('code:first-child')
    .each((index, element) => {
      const parameter = $(element).text()
      console.log(parameter) // FIXME: VALIDAR SI PUEDO ITERARP IMERO EL UL Y DESPUES EL LI PARA ENCPONTRAR EL PRIMER CODE DE CADA LI Y AS IEVITAR METER BASURA
      fileConfiguration.write(`\t'${parameter}': null,\n`)
    })

  fileConfiguration.write(`} \n module.exports = workbench`)
}

scraping()
