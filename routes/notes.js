const notes = require('express').Router()
const { nanoid } = require('nanoid')
const path = require('path')
const db = require('../db/db.json')
const dbFile = path.join(__dirname, '../db/db.json')
const { readDbFile, writeDbFile } = require('../helpers/fsUtils')

notes
	.route('/')
	// GET Route for retrieving all notes
	.get((req, res) => {
		readDbFile(dbFile).then((data) => res.json(JSON.parse(data)))
	})

	// POST route for adding a note
	.post((req, res) => {
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
			writeDbFile(dbFile, db)

			const response = {
				status: 'success',
				body: newNote
			}

			res.status(201).json(response)
		}
	})

// DELETE route for removing a note
notes.delete('/:id', (req, res) => {
	// Set params.id
	const noteId = req.params.id
	readDbFile(dbFile)
		.then((data) => JSON.parse(data))
		.then((json) => {
			// Check to see if note id exists in array
			const findId = json.some((note) => note.id === noteId)

			if (findId) {
				// If note id exists, filter out note with id
				const delNoteById = json.filter((note) => note.id !== noteId)
				// Write to file with the note removed
				writeDbFile(dbFile, delNoteById)
				res.status(204).json(`Note ${noteId} has been deleted 🗑️`)
				console.log(`Note ${noteId} has been deleted 🗑️`)
			} else {
				res.status(500).json(`Error deleting note ${noteId}`)
			}
		})
})

module.exports = notes
