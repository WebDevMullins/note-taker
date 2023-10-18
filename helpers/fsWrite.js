const fs = require('fs')

const writeToFile = (file, content) =>
	fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
		err ? console.error(err) : console.info(`\nData written to ${file}`)
	)

module.exports = writeToFile
