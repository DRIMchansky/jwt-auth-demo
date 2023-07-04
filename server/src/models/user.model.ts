import { model, Schema, Model } from 'mongoose'

export type UserInfoPublicUpdatable = {
  firstName: string
  lastName: string
}

export type UserInfoPublic = UserInfoPublicUpdatable & {
  id: string
  login: string
}

export interface IUser {
  login: string
  password: string
  firstName?: string
  lastName?: string
}

export interface IUserDocument extends IUser, Document {
  getPublicInfo: () => UserInfoPublic
  updatePublicInfo: (dataUpdated: UserInfoPublicUpdatable) => void
}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>({
  login: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String }
})

userSchema.methods.getPublicInfo = function () {
  return {
    id: this._id,
    login: this.login,
    firstName: this.firstName,
    lastName: this.lastName
  }
}

userSchema.methods.updatePublicInfo = function (dataUpdated: UserInfoPublicUpdatable) {
  dataUpdated.firstName && (this.firstName = dataUpdated.firstName)
  dataUpdated.lastName && (this.lastName = dataUpdated.lastName)
}

export const UserModel = model<IUserDocument, IUserModel>('User', userSchema)
