/* eslint-disable react/prop-types */
import React from 'react'

function CreateNoteButton ({ onCreateNote }) {
  return (
    <button
      onClick={onCreateNote}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 transition-colors duration-300"
    >
      Create Note
    </button>
  )
}

export default CreateNoteButton
