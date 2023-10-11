const express = require('express')
const path = require('path')

const app = express()
const PORT = 3001

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
