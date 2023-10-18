const notes = require('express').Router()
const fs = require('fs')
const path = require('path')
const { nanoid } = require('nanoid')
const db = require('../db/db.json')

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.json(db))

//  POST route for adding a note
notes.post('/', (req, res) => {
	console.info(`${req.method} request received to add a note`)

	const { title, text } = req.body

	const newNote = { title, text, id: nanoid(5) }

	db.push(newNote)

	fs.writeFile(path.join('./db/db.json'), JSON.stringify(db), (err) => {
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
