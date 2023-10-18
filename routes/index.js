const router = require('express').Router()

// Import modular routers for /notes
const notesRouter = require('./notes')

router.use('/api/notes', notesRouter)

module.exports = router
