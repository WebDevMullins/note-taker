const fs = require('fs')

// Read data from file
const readDbFile = (file) => JSON.parse(fs.readFileSync(file))

// Write data to file given destination and content
const writeDbFile = (file, content) => fs.writeFileSync(file, JSON.stringify(content))

module.exports = { readDbFile, writeDbFile }
