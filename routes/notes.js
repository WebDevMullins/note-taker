const notes = require('express').Router()
const fs = require('fs')
const path = require('path')
const { nanoid } = require('nanoid')
const db = require('../db/db.json')
const writeToFile = require('../helpers/fsWrite')

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.json(db))

//  POST route for adding a note
notes.post('/', (req, res) => {
	console.info(`${req.method} request received to add a note`)

	const { title, text } = req.body

	if (title && text) {
		const newNote = {
			title,
			text,
			id: nanoid(5)
		}

		db.push(newNote)

		writeToFile('./db/db.json', db)

		const response = {
			status: 'success',
			body: newNote
		}

		res.json(response)
	} else {
		res.json('Error adding note')
	}
})

notes.delete('/:id', (req, res) => {
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

module.exports = notes
