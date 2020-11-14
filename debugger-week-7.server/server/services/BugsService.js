import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import Bugs from '../models/Bug'
class BugsService {
  async getBugs(query = {}) {
    return await dbContext.Bugs.find(query).populate('creatorId')
  }

  async createBugs(body) {
    return await dbContext.Bugs.create(body)
  }

  async deleteBug(boardId, userId) {
    const exists = await dbContext.Bugs.findById(boardId)
    if (!exists) {
      throw new BadRequest('This board does not exist')
    } else if (exists._doc.creatorId == userId) {
      await dbContext.Bugs.findByIdAndDelete(boardId)
      return 'The board has been deleted'
    }
  }

  async getBugById(boardId) {
    return await dbContext.Bugs.findById(boardId)
  }
}

export const bugsService = new BugsService()
