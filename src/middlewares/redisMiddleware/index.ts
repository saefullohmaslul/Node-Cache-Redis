import { RedisConfig } from '../../utils/redis'
import { Request, Response, NextFunction } from 'express'
import { promisify } from 'es6-promisify'
import { RedisError } from 'redis'
import response from '../../utils/response'

const redisMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const redisStatus = process.env.REDIS_STATUS
  if (redisStatus === 'true') {
    const client = RedisConfig.config()

    client.on('error', (error: RedisError) => {
      console.error(`Redis error: ${error}`)
      next()
    })

    client.get(`${req.path}`, (error: Error | null, result: any) => {
      if (result) {
        result = JSON.parse(result)

        return response.success('Success get cached data', res, result)
      } else {
        next()
      }
    })
  } else {
    next()
  }
}

export default redisMiddleware