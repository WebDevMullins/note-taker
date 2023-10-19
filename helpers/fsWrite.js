const fs = require('fs')

const writeToFile = (file, content) =>
	fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
		err ? console.error(err) : console.log(`Database has been updated`)
	)

module.exports = writeToFile
