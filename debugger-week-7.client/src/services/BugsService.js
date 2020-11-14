import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async createBugs(data) {
    try {
      const res = await api.post('/bugs', data)
      this.getBugs()
      logger.log(res.data)
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

  //   async deleteBug(boardId) {
  //     try {
  //       await api.delete('/boards/' + boardId)
  //       this.getBugs()
  //     } catch (error) {
  //       logger.error(error)
  //     }
  //   }

//   async getActiveBug(boardId) {
//     try {
//       const res = await api.get('/boards/' + boardId)
//       logger.log('from the service')
//       AppState.activeBug = res.data
//     } catch (error) {
//       logger.error(error)
//     }
//   }
}

export const bugsService = new BugsService()
