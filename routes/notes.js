const notes = require('express').Router()
const { nanoid } = require('nanoid')
const db = require('../db/db.json')
const writeToFile = require('../helpers/fsWrite')

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.status(200).json(db))

// POST route for adding a note
notes.post('/', (req, res) => {
	// Log POST method was made
	console.log(`${req.method} request received to add a note`)
	// Deconstruct body
	const { title, text } = req.body
	// Validation to make sure body contains both a title and text
	if (title && text) {
		const newNote = {
			title,
			text,
			id: nanoid(5)
		}
		// Add note to db array
		db.push(newNote)
		// Write to file with added note
		writeToFile('./db/db.json', db)

		const response = {
			status: 'success',
			body: newNote
		}

		res.status(201).json(response)
	} else {
		res.console.error('Error adding note')
	}
})
// DELETE route for removing a note
notes.delete('/:id', (req, res) => {
	// Set params.id
	const noteId = req.params.id
	// Log Delete method was make along with the note id
	console.log(`${req.method} request received to remove note with id ${noteId}`)
	// Check to see if note id exists in array
	const findId = db.some((note) => note.id === noteId)

	if (findId) {
		// If note id exists, filter out note with id
		const delNoteById = db.filter((note) => note.id !== noteId)
		// Write to file with the note removed
		writeToFile('./db/db.json', delNoteById)

		console.log(`Deleted note with id ${noteId}`)

		res.sendStatus(204)
	} else {
		console.log(`Error deleting note ${noteId}`)

		res.status(500).json(`Error deleting note ${noteId}`)
	}
})

module.exports = notes
