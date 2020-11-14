import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getNotes)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createNotes)
      .delete('/:noteId', this.deleteNote)
      .get('/:noteId', this.getNoteById)
  }

  async getNotes(req, res, next) {
    try {
      return res.send(await notesService.getNotes({ creatorId: req.userInfo.id }))
    } catch (error) {
      next(error)
    }
  }

  async createNotes(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creatorEmail = req.userInfo.email
      // console.log(req.body.creatorId)
      res.send(await notesService.createNotes(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      res.send(await notesService.deleteNote(req.params.noteId))
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      return res.send(await notesService.getNoteById(req.params.noteId))
    } catch (error) {
      next(error)
    }
  }
}
