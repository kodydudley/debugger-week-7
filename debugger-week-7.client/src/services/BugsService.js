import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async createBugs(data) {
    try {
      return await api.post('/bugs', data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getBugs() {
    try {
      const res = await api.get('/bugs')
      AppState.bugs = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET IDIOT???', err)
    }
  }

  async deleteBug(bugId) {
    try {
      const res = await api.put('/bugs/' + bugId, { closed: true })
      AppState.activeBug = res.data
      logger.log('close')
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get('/bugs/' + bugId)
      logger.log('from the service')
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async editBug(bugId, body) {
    try {
      const res = await api.put('bugs/' + bugId, body)
      console.log(bugId, body)
      AppState.activeBug = res.data
      this.getActiveBug(bugId)
    } catch (error) {
      console.error(error)
    }
  }
}

export const bugsService = new BugsService()
