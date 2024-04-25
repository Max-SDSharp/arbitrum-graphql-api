interface ArbitrumBlock {
  number: number
}

interface LatestBlockResponse {
  blocks: ArbitrumBlock[]
}

export type { ArbitrumBlock, LatestBlockResponse }
