const express = require('express')
const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')
const dbData = require('./db/db.json')

const app = express()
const PORT = 3001

app.use(express.json())

app.use(express.static('public'))

app.get('/api/notes', (req, res) => res.json(dbData))

app.post('/api/notes', (req, res) => {
	console.info(`${req.method} request received to add a review`)

	const { title, text } = req.body

	const newNote = { title, text, id: nanoid(5) }

	dbData.push(newNote)

	fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(dbData), (err) => {
		if (err) {
			console.error('Error writing to db.json', err)
		} else {
			const response = {
				status: 'success',
				body: newNote
			}
			console.log(response)
			res.status(201).json(response)
		}
	})
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
