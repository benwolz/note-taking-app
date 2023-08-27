import React, { useState, useEffect } from 'react'
import './tailwind.css'
import api from './api'
import NoteList from './components/NoteList.js'
import NoteView from './components/NoteView.js'

function App () {
  const [selectedNote, setSelectedNote] = useState(null)
  const [notes, setNotes] = useState([])

  const fetchNotes = async (selectedNoteId = 0) => {
    try {
      const response = await api.get('/notes')
      setNotes(response.data)
      setSelectedNote(response.data[selectedNoteId])
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }
  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSelectNote = (note) => {
    setSelectedNote(note)
  }

  const handleCreateNote = async () => {
    try {
      const response = await api.post('/notes', { title: 'New Note', content: '' })
      setNotes([...notes, response.data])
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  const handleNoteUpdate = async (id, title, content) => {
    try {
      await api.put(
        `/notes/${id}`,
        {
          title,
          content
        }
      )
      fetchNotes(id)
    } catch (error) {
      console.error(`Failed to update note. ID ${id}`, error)
    }
  }

  const handleNoteDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`)
      fetchNotes(id)
    } catch (error) {
      console.error('Failed to delete note', error)
    }
  }

  const handleNoteRestore = async (id) => {
    try {
      console.log('restoring')
      await api.put(`/notes/${id}/restore`)
      fetchNotes(id)
    } catch (error) {
      console.error('Failed to restore note', error)
    }
  }

  return (
    <div className="App flex w-full h-screen">
      <div className="w-1/4 h-screen bg-gray-300 flex items-center justify-center">
        <div className="bg-gray-400 p-2 w-full h-[calc(100%-1rem)] mx-4 my-4 rounded-lg">
          <NoteList NoteList notes={notes} onSelectNote={handleSelectNote} onCreateNote={handleCreateNote} />
        </div>
      </div>
      <div className="w-3/4 h-screen bg-gray-300 flex items-center justify-center">
        <div className="bg-gray-300 p-2 w-full h-[calc(100%-1rem)] mx-4 my-4 rounded-lg">
          <NoteView selectedNote={selectedNote} onUpdate={handleNoteUpdate} onDelete={handleNoteDelete} onRestore={handleNoteRestore} />
        </div>
      </div>
    </div>
  )
}

export default App
