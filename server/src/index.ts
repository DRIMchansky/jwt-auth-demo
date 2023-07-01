import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const initExpress = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

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