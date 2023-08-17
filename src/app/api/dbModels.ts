import mongoose from 'mongoose'
import { Card } from './models/CardModel'
import { User } from './models/UserModel'

mongoose.Promise = global.Promise

// Get the MongoDB URI from the environment variables and connect to the database
const mongoUri = process.env.MONGODB_URI!
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('Database connected')
  } catch (err: any) {
    console.error(`MongoDB connection error: ${err.message}`)
    throw new Error(err)
  }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase()

export { Card, User }
