import { graphQLClient } from '../src/config'
import { getLatestBlock } from '../src/services/block.service'
import { CacheService } from '../src/services/cache.service'

jest.mock('../src/services/cache.service')

const mockCacheServiceInstance = {
  get: jest.fn(),
  set: jest.fn(),
}
const mockGraphQLClientRequest = jest.fn()

describe('Block Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    jest
      .spyOn(CacheService.prototype, 'get')
      .mockImplementation(mockCacheServiceInstance.get)
    jest
      .spyOn(CacheService.prototype, 'set')
      .mockImplementation(mockCacheServiceInstance.set)

    graphQLClient.request = mockGraphQLClientRequest
  })

  test('Should fetch latest block number and cache it', async () => {
    const mockedLatestBlockResponse = {
      blocks: [{ number: 123456 }],
    }

    mockCacheServiceInstance.get.mockReturnValue(undefined)
    mockGraphQLClientRequest.mockResolvedValue(mockedLatestBlockResponse)

    const latestBlockNumber = await getLatestBlock()

    expect(latestBlockNumber).toBe(123456)
    expect(mockCacheServiceInstance.get).toHaveBeenCalledWith('latestBlock')
    expect(mockGraphQLClientRequest).toHaveBeenCalled()
    expect(mockCacheServiceInstance.set).toHaveBeenCalledWith(
      'latestBlock',
      123456,
      expect.any(Number),
    )
  })

  test('Should fetch latest block number from cache', async () => {
    mockCacheServiceInstance.get.mockReturnValue(654321)

    const latestBlockNumber = await getLatestBlock()

    expect(latestBlockNumber).toBe(654321)
    expect(mockCacheServiceInstance.get).toHaveBeenCalledWith('latestBlock')
    expect(mockGraphQLClientRequest).not.toHaveBeenCalled()
    expect(mockCacheServiceInstance.set).not.toHaveBeenCalled()
  })

  test('Should throw error when failed to fetch latest block', async () => {
    mockCacheServiceInstance.get.mockReturnValue(undefined)
    mockGraphQLClientRequest.mockRejectedValue(
      new Error('Failed to fetch block'),
    )

    await expect(getLatestBlock()).rejects.toThrow(
      'Failed to fetch latest block',
    )

    expect(mockCacheServiceInstance.get).toHaveBeenCalledWith('latestBlock')
    expect(mockGraphQLClientRequest).toHaveBeenCalled()
    expect(mockCacheServiceInstance.set).not.toHaveBeenCalled()
  })

  test('Should fetch latest block number from cache even if cache value is null', async () => {
    mockCacheServiceInstance.get.mockReturnValue(null)

    const latestBlockNumber = await getLatestBlock()

    expect(latestBlockNumber).toBe(null)
    expect(mockCacheServiceInstance.get).toHaveBeenCalledWith('latestBlock')
    expect(mockGraphQLClientRequest).not.toHaveBeenCalled()
    expect(mockCacheServiceInstance.set).not.toHaveBeenCalled()
  })
})
