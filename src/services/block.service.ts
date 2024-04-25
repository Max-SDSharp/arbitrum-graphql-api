import { CacheService } from './cache.service'
import { graphQLClient } from '../config'
import { LatestBlockResponse } from '../types/block.types'

const cache = new CacheService()
const CACHE_TTL_SECONDS = process.env.CACHE_TTL_SECONDS
  ? parseInt(process.env.CACHE_TTL_SECONDS)
  : 1

const getLatestBlock = async (): Promise<number> => {
  try {
    const cacheKey = 'latestBlock'
    const cachedBlock = cache.get<number>(cacheKey)

    if (cachedBlock !== undefined) {
      return cachedBlock
    }

    const query = ` {
      blocks(first: 1, orderBy: number, orderDirection: desc) {
          number
          timestamp
      }
    }`

    const data: LatestBlockResponse = await graphQLClient.request(query)

    const latestBlockNumber = data.blocks[0].number

    cache.set(cacheKey, latestBlockNumber, CACHE_TTL_SECONDS)

    return latestBlockNumber
  } catch (error) {
    throw new Error('Failed to fetch latest block')
  }
}

export { getLatestBlock }
