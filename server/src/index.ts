import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { UserController } from './controllers/user.controller'
import { DatabaseMongo } from './database/database.mongo'

dotenv.config()

const initExpress = async () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const db = new DatabaseMongo()
  await db.connect()

  const userController = new UserController()

  app.post('/register', userController.register.bind(userController))

  app.get('/', (req, res) => {
    res.json({
      test: true
    })
  })

  app.listen(process.env.PORT || 7060)
}

const startApp = async () => {

  initExpress()
}

startApp()
