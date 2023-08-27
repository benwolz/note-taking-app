import Note from './Note.js'

class NoteManager {
  constructor () {
    this.notes = []
  }

  create (title, content) {
    const id = this.notes.length
    const note = new Note(id, title, content)
    this.notes.push(note)
    return note
  }

  get (id) {
    return this.notes[id]
  }

  getAll () {
    return this.notes
  }

  update (id, title, content) {
    const note = this.notes[id]
    if (note) {
      note.update(title, content)
      return note
    }

    return null
  }

  delete (id) {
    const note = this.notes[id]
    if (note) {
      note.delete()
    }

    return note
  }

  restore (id) {
    const note = this.notes[id]
    if (note && note.deleted) {
      note.restore()
      return note
    }

    return null
  }

  getVersionHistory (id) {
    const note = this.notes[id]
    if (note) {
      return note.getVersionHistory()
    }

    return []
  }
}

export default NoteManager
