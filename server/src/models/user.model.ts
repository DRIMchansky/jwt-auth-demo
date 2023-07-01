import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  name: { type: String }
})

const userModel = model('user', userSchema)

export { userModel }
