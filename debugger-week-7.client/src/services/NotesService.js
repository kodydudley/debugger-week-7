import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async createNotes(data) {
    try {
      const res = await api.post('/notes', data)
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getNotes(bugId) {
    try {
      const res = await api.get('/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET IDIOT???', err)
    }
  }

  async deleteNote(noteId, bugId) {
    try {
      await api.delete('/notes/' + noteId)
      this.getNotes(bugId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const notesService = new NotesService()
