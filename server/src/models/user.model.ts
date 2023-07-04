import { model, Schema, Model } from 'mongoose'

export type UserDataPublic = {
  id: string
  login: string
  firstName: string
  lastName: string
}

export interface IUser {
  login: string
  password: string
  firstName?: string
  lastName?: string
}

export interface IUserDocument extends IUser, Document {
  getPublic: () => UserDataPublic
  updateData: (dataUpdated: UserDataPublic) => void
}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>({
  login: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String }
})

userSchema.methods.getPublic = function () {
  return {
    id: this._id,
    login: this.login,
    firstName: this.firstName,
    lastName: this.lastName
  }
}

userSchema.methods.updateData = function (dataUpdated: UserDataPublic) {
  dataUpdated.firstName && (this.firstName = dataUpdated.firstName)
  dataUpdated.lastName && (this.lastName = dataUpdated.lastName)
  dataUpdated.login && (this.login = dataUpdated.login)
}

export const UserModel = model<IUserDocument, IUserModel>('User', userSchema)
