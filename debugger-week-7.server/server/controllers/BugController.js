import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/', this.getBugs)
      .get('/:bugId/notes', this.getNotesByBugId)
      .put('/:bugId', this.editBug)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.createBugs)
      .delete('/:bugId', this.deleteBug)
      .get('/:bugId', this.getBugById)
  }

  async editBug(req, res, next) {
    try {
      return res.send(await bugsService.editBug(req.params.bugId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getBugs(req, res, next) {
    try {
      return res.send(await bugsService.getBugs(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      return res.send(await notesService.getNotes({ bug: req.params.bugId }))
    } catch (error) {
      next(error)
    }
  }

  async createBugs(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creatorEmail = req.userInfo.email
      // console.log(req.body.creatorId)
      res.send(await bugsService.createBugs(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await bugsService.deleteBug(req.params.bugId, userId))
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      return res.send(await bugsService.getBugById(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }
}
