import mongoose from 'mongoose'
import { IUser } from '../types/types'

const UsersSchema = new mongoose.Schema<IUser>({
  name: {type: String, required: true },
  password: {type: String, required: true }
})

export default mongoose.model('User', UsersSchema)
