import mongoose from 'mongoose'
import { Item } from './ItemModel'
import { Notification } from './NotificationModel'
import { Request } from './RequestModel'
import { User } from './UserModel'

mongoose.Promise = global.Promise

const mongoUri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_LOCAL || ''

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return
  }

  try {
    await mongoose.connect(mongoUri as string)
  } catch (err: any) {
    console.error(`MongoDB connection error: ${err.message}`)
    throw new Error(err)
  }
}

// const closeDatabaseConnection = async () => {
//   try {
//     await mongoose.connection.close()
//     console.log('Database connection closed')
//   } catch (err: any) {
//     console.error(`MongoDB connection error: ${err.message}`)
//     throw new Error(err)
//   }
// }

connectToDatabase()

export { Item, Notification, Request, User }
