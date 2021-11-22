const workbench = require('./workbenchColorCustomizations')
const fs = require('fs-extra')

console.log(Object.keys(workbench).length)
fs.createWriteStream('JSON-configuration.json')
fs.writeFile('JSON-configuration.json', JSON.stringify(workbench, null, 2))

//TODO: en otro lado para cmparar obtener los object keys del objeto final y compararlos con uno naterio o le actual, pensar y vvalidar si es viable
