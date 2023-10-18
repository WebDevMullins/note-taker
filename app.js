const express = require('express')
const path = require('path')
const api = require('./routes')

const app = express()

const PORT = 3001

app.use(express.json())
app.use('/', api)
app.use(express.static('public'))

//  GET route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

//  GET route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

//  Fallback for unrecognized endpoint
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
