import express from 'express'
import cors from 'cors'
import NoteManager from '../models/NoteManager.js'

const app = express()
const noteManager = new NoteManager()

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(cors())

const validateNote = (req, res, next) => {
  const { title } = req.body

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Note title cannot be empty' })
  }

  next()
}

// Create Note
app.post('/notes', validateNote, (req, res) => {
  const { title, content } = req.body
  const note = noteManager.create(title, content)
  res.status(201).json(note)
})

// Get all Notes
app.get('/notes', (req, res) => {
  res.json(noteManager.getAll())
})

// Get single note by ID
app.get('/notes/:id', (req, res) => {
  const note = noteManager.get(Number(req.params.id))
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: 'Note not found' })
  }
})

// Update note content
app.put('/notes/:id', validateNote, (req, res) => {
  const { title, content } = req.body
  const note = noteManager.update(Number(req.params.id), title, content)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: 'Note not found' })
  }
})

// Soft delete note
app.delete('/notes/:id', (req, res) => {
  const note = noteManager.delete(Number(req.params.id))
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: 'Note not found' })
  }
})

// Restore note
app.put('/notes/:id/restore', (req, res) => {
  const note = noteManager.restore(Number(req.params.id))
  if (note) {
    res.json(note)
  } else if (note.deleted === false) {
    res.status(404).json({ error: 'Note not deleted' })
  } else {
    res.status(404).json({ error: 'Note not found' })
  }
})

// Get specific version
app.get('/notes/:id/history/:version', (req, res) => {
  const history = noteManager.getVersionHistory(Number(req.params.id))
  if (history.length > 0) {
    res.json(history[Number(req.params.version)])
  } else {
    res.status(404).json({ error: 'Note not found' })
  }
})
