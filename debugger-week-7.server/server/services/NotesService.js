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

  async deleteNote(listId) {
    const exists = await dbContext.Notes.findById(listId)
    if (!exists) {
      throw new BadRequest('This note does not exist')
    } else {
      await dbContext.Notes.findByIdAndDelete(listId)
      return 'The note has been deleted'
    }
  }

  async getNoteById(boardId) {
    return await dbContext.Notes.findById(boardId)
  }
}

export const notesService = new NotesService()
