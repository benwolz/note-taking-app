/* eslint-disable react/prop-types */
import React from 'react'
import CreateNoteButton from './CreateNoteButton'

function NoteList ({ notes, onSelectNote, onCreateNote }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="my-4">
        <CreateNoteButton onCreateNote={onCreateNote} />
      </div>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`p-4 border border-gray-200 rounded shadow cursor-pointer break-words w-full ${note.deleted ? 'bg-red-100' : 'bg-white'}`}
            onClick={() => onSelectNote(note)}
          >
            <div className="text-lg font-semibold mb-1">
              {note.versionHistory[note.versionHistory.length - 1].title}
            </div>
            {note.deleted
              ? (
              <div className="text-sm text-gray-600 italic">deleted</div>
                )
              : (
                  ''
                )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoteList
