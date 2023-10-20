const fs = require('fs')
const util = require('util')

// Read data from file
const readDbFile = util.promisify(fs.readFile)

// Write data to file given destination and content
const writeDbFile = (file, content) =>
	fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
		err ? console.error(err) : console.log(`Database has been updated`)
	)

module.exports = { readDbFile, writeDbFile }
