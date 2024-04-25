import express, { Request, Response } from 'express'

const router = express.Router()

import controller from '../controllers/block.controller'

router.get('/lastest', (req: Request, res: Response) => {
  controller.getBlock(req, res)
})

export default router
