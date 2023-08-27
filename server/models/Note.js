class Note {
  constructor (id, title, content) {
    this.id = id
    this.deleted = false
    this.versionHistory = [{ title, content, updatedAt: new Date() }]
  }

  update (title, content) {
    this.versionHistory.push({ title, content, updatedAt: new Date() })
  }

  getVersionHistory () {
    return this.versionHistory
  }

  delete () {
    this.deleted = true
  }

  restore () {
    this.deleted = false
  }
}

export default Note
