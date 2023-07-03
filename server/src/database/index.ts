import mongoose from 'mongoose'

class Database {
  async connect(): Promise<void> {
    try {
      const host = process.env.DB_HOST
      const port = process.env.DB_PORT
      const name = process.env.DB_NAME

      await mongoose.connect(`mongodb://${host}:${port}/${name}`)
    } catch (error) {
      console.error('DB connection error: ', error)
    }
  }
}

const db = new Database()
export { db }
