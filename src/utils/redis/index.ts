import redis from 'redis'
require('../environment')

export class RedisConfig {
  public static config() {
    const client = redis.createClient({
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as string),
      auth_pass: process.env.REDIS_PASS as string,
      no_ready_check: true
    })

    return client
  }
}