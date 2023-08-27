/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

function NoteView ({ selectedNote, onUpdate, onDelete, onRestore }) {
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [versionNumber, setVersionNumber] = useState('')

  useEffect(() => {
    // const latestVersion = selectedNote.versionHistory.length
    setSelectedVersion(
      selectedNote ? selectedNote.versionHistory.slice(-1)[0] : null
    )
    setTitle(
      selectedNote ? selectedNote.versionHistory.slice(-1)[0].title : ''
    )
    setContent(
      selectedNote ? selectedNote.versionHistory.slice(-1)[0].content : ''
    )
    setVersionNumber(
      selectedNote ? selectedNote.versionHistory.length : 0
    )
  }, [selectedNote])

  const noteReadOnly = (versionNumber) => {
    const parsedVersionNumber = parseInt(versionNumber, 10)
    return (
      parsedVersionNumber !== selectedNote.versionHistory.length || // not on latest version number
        selectedNote.deleted // note is deleted
    )
  }

  const handleTitleUpdate = (newTitle) => {
    setTitle(newTitle)
  }

  const handleContentUpdate = (newContent) => {
    setContent(newContent)
  }

  const handleVersionChange = (event) => {
    const versionIndex = event.target.value - 1
    setSelectedVersion(selectedNote.versionHistory[versionIndex])
    setTitle(selectedNote.versionHistory[versionIndex].title)
    setContent(selectedNote.versionHistory[versionIndex].content)
    setVersionNumber(event.target.value)
  }

  const handleClickDelete = (action, id) => {
    if (action === 'delete') {
      onDelete(id)
    } else if (action === 'restore') {
      onRestore(id)
    }
  }

  const displayedNote = selectedVersion || selectedNote

  return (
      <div className="flex flex-col bg-gray-300 p-4 w-full h-full rounded-lg">
        {displayedNote && (<>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col w-full h-full space-y-2">
            <input
              type="text"
              value={title}
              onChange={e => handleTitleUpdate(e.target.value)}
              className="bg-gray-300 hover:bg-gray-100 text-xl font-bold w-full transition duration-150 ease-in rounded"
              readOnly={noteReadOnly(versionNumber)}
            />
              <textarea
                value={content}
                onChange={e => handleContentUpdate(e.target.value)}
                className={`w-full h-full resize-none flex-grow rounded px-4 py-2 ${noteReadOnly(versionNumber) ? 'bg-gray-200' : ''}`}
                readOnly={noteReadOnly(versionNumber)}
              />
            </div>
          </div>
          <div className="flex-2 flex items-center justify-between my-2">
            {selectedNote.versionHistory && (
              <div>
                <select id="version-history" onChange={handleVersionChange} value={versionNumber}>
                  {selectedNote.versionHistory.map((_, index) => (
                    <option key={index} value={index + 1}>
                      Version {index + 1}
                    </option>
                  ))}
                </select>
              <p className="text-xs text-gray-700" >id: {selectedNote.id}</p>
              </div>
            )}

            <div className="flex">
              <button
              onClick={() => onUpdate(selectedNote.id, title, content)}
              className={`mx-3 py-1 px-3 rounded ${(noteReadOnly(versionNumber) || (title.length === 0)) ? 'bg-gray-500' : 'bg-green-500'} text-white`}
              disabled={(noteReadOnly(versionNumber) || (title.length === 0))}
            >
                Save Note
              </button>
              <button
                onClick={() => handleClickDelete(selectedNote.deleted ? 'restore' : 'delete', selectedNote.id)}
                className={`mx-3 py-1 px-3 rounded ${selectedNote.deleted ? 'bg-blue-500' : 'bg-red-500'} text-white`}
              >
                {`${selectedNote.deleted ? 'Restore Note' : 'Delete Note'}`}
              </button>
            </div>
          </div>
        </>
        )}
      </div>
  )
}

export default NoteView
