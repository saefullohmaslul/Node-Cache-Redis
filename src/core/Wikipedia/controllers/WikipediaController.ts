require('../../../utils/environment')
import { Request, Response } from 'express'
import { RedisConfig } from '../../../utils/redis'
import response from '../../../utils/response'
import WikipediaService from '../services/WikipediaService'

export class WikipediaController {
  async getWikipediaData(req: Request, res: Response) {
    try {
      const query = req.query['query'].trim()
      const wikipediaData = await WikipediaService.getData(query)

      if (process.env.REDIS_STATUS === 'true') {
        const client = RedisConfig.config()
        client.set(`${req.path}`, JSON.stringify(wikipediaData), 'EX', 60 * 60) // 1 hour
      }

      return response.success(`Success get wikipedia ${query}`, res, wikipediaData)
    } catch (error) {
      return response.error('Internal server error', res, 'INTERNAL_SERVER_ERROR')
    }
  }
}