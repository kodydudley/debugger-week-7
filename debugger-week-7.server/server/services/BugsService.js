import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import Bugs from '../models/Bug'
class BugsService {
  async editBug(bugId, body) {
    return await dbContext.Bugs.findOneAndUpdate({ _id: bugId, closed: false }, body)
  }

  async getBugs(query = {}) {
    return await dbContext.Bugs.find(query).populate('creatorId')
  }

  async createBugs(body) {
    return await dbContext.Bugs.create(body)
  }

  async deleteBug(bugId, userId) {
    const exists = await dbContext.Bugs.findById(bugId)
    if (!exists) {
      throw new BadRequest('This THINGGG does not exist')
    } else if (exists._doc.creatorId == userId) {
      await dbContext.Bugs.findByIdAndDelete(bugId)
      return 'The bug has been deleted'
    }
  }

  async getBugById(boardId) {
    return await dbContext.Bugs.findById(boardId)
  }
}

export const bugsService = new BugsService()
