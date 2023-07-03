import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { db } from './database'
import { userRouter } from './routes/user.router'
import { errorMiddleware } from './middlewares/error.middleware'

dotenv.config()

const initExpress = async () => {
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

const startApp = async () => {
  initExpress()
}

startApp()
