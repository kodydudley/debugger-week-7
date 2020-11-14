import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import Notes from '../models/Note'
class NotesService {
  async getNotes(query = {}) {
    return await dbContext.Notes.find(query).populate('creatorId')
  }

  async createNotes(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(bugId) {
    const exists = await dbContext.Notes.findById(bugId)
    if (!exists) {
      throw new BadRequest('This board does not exist')
    } else {
      await dbContext.Notes.findByIdAndDelete(bugId)
      return 'The board has been deleted'
    }
  }

  async getNoteById(boardId) {
    return await dbContext.Notes.findById(boardId)
  }
}

export const notesService = new NotesService()
