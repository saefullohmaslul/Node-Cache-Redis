import { Router } from 'express'
import { WikipediaController } from './controllers/WikipediaController'
import redisMiddleware from '../../middlewares/redisMiddleware'

const router = Router()
const controller = new WikipediaController()

router.get(
  '/search',
  redisMiddleware,
  controller.getWikipediaData
)

module.exports = router