const fs = require('fs')

const writeToFile = (file, content) =>
	fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
		err ? console.error(err) : console.info(`\n${file} has been updated`)
	)

module.exports = writeToFile
