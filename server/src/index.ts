import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { errorMiddleware } from './middlewares/error.middleware'
import { userRouter } from './routes/user.router'
import * as db from './services/db.service'

dotenv.config()

const run = async () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }))

  await db.connect()

  app.use('/api', userRouter)
  app.use(errorMiddleware)

  app.listen(process.env.PORT || 7060)
}

run()
