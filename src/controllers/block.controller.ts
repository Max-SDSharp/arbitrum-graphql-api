import { Request, Response } from 'express'

import { getLatestBlock } from '../services/block.service'

const getBlock = async (req: Request, res: Response): Promise<void> => {
  try {
    const latestBlock = await getLatestBlock()
    res.json({ latestBlock })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default { getBlock }
