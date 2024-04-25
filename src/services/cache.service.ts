import NodeCache from 'node-cache'

class CacheService {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache()
  }

  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key)
  }

  public set<T>(key: string, value: T, ttlSeconds: number): void {
    this.cache.set<T>(key, value, ttlSeconds)
  }
}

export { CacheService }
