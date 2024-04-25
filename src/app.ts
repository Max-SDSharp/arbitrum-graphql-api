import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'

import blockRoutes from './routes/block.routes'

const app = express()

app.use(helmet())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  import('morgan')
    .then((morgan) => {
      app.use(morgan.default('dev'))
    })
    .catch((error) => {
      console.error('Error importing morgan:', error)
    })
}

app.use(cors())

app.use('/block', blockRoutes)

export default app
