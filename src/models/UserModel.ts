// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose'
import { AdapterUser } from 'next-auth/adapters'

// Define the structure of a User document using TypeScript interfaces
interface User extends AdapterUser {
  firstName: string
  lastName: string
  role: string
  phone: string
  address: {
    streetName: string
    streetNumber: string
    city: string
    zipCode: number
    country: string
  }
}

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema<User>({
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String },
  phone: { type: String },
  address: {
    streetName: { type: String },
    streetNumber: { type: String },
    city: { type: String },
    zipCode: { type: Number },
    country: { type: String },
  },
})

// Create and return the Mongoose model for the User collection.
// If the model already exists, return the existing model; otherwise, create a new one.
export const User =
  mongoose.models.User ||
  mongoose.model<User & mongoose.Document>('User', userSchema)
