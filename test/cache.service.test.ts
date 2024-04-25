import NodeCache from 'node-cache'

import { CacheService } from '../src/services/cache.service'

describe('Cache Service', () => {
  test('Should create NodeCache instance', () => {
    const cacheService = new CacheService()

    expect(cacheService['cache']).toBeInstanceOf(NodeCache)

    const stats = cacheService['cache'].getStats()
    const keys = Array.isArray(stats.keys) ? stats.keys : []
    expect(keys).toHaveLength(0)
  })

  test('Should set and get value from cache', () => {
    const cacheService = new CacheService()
    const key = 'testKey'
    const value = 'testValue'
    const ttlSeconds = 60

    cacheService.set(key, value, ttlSeconds)

    const cachedValue = cacheService.get<string>(key)

    expect(cachedValue).toEqual(value)
  })

  test('Should return undefined if key is not in cache', () => {
    const cacheService = new CacheService()
    const key = 'nonExistentKey'

    const cachedValue = cacheService.get<string>(key)

    expect(cachedValue).toBeUndefined()
  })

  test('Should return undefined if value has expired in cache', async () => {
    const cacheService = new CacheService()
    const key = 'expiredKey'
    const value = 'expiredValue'
    const ttlSeconds = 1

    cacheService.set(key, value, ttlSeconds)

    await new Promise((resolve) => setTimeout(resolve, 1100))

    const cachedValue = cacheService.get<string>(key)

    expect(cachedValue).toBeUndefined()
  })
})
