const express = require('express')
const path = require('path')
const dbData = require('./db/db.json')

const app = express()
const PORT = 3001

app.use(express.static('public'))

app.get('/api/notes', (req, res) => {
	res.json(dbData)
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
