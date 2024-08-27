import mongoose from 'mongoose'

export interface Notification {
  _id?: mongoose.Schema.Types.ObjectId
  title: string
  message: string
  status: 'unread' | 'read'
  invisible: boolean
  image?: string
  user: mongoose.Schema.Types.ObjectId
}
