const express = require('express')
const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')

const db = require('./db/db.json')

const app = express()
const PORT = 3001

app.use(express.json())

app.use(express.static('public'))

app.get('/api/notes', (req, res) => res.json(db))

app.post('/api/notes', (req, res) => {
	console.info(`${req.method} request received to add a note`)

	const { title, text } = req.body

	const newNote = { title, text, id: nanoid(5) }

	db.push(newNote)

	fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db), (err) => {
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

app.delete('/api/notes/:id', (req, res) => {
	console.info(`${req.method} request received to remove note with id ${req.params.id}`)

	const delNoteById = db.filter((note) => note.id !== req.params.id)

	fs.writeFile('./db/db.json', JSON.stringify(delNoteById), (err) => {
		if (err) {
			console.error('Error deleting note', err)
			res.status(500).json('Failed to delete the note')
		} else {
			console.log('Deleted note')
			res.status(204).json('Deleted note')
		}
	})
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
