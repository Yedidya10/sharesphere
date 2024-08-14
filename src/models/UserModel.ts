// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose'
import { AdapterUser } from 'next-auth/adapters'

// Define the structure of a User document using TypeScript interfaces
export interface IUser extends AdapterUser {
  email: string
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
  lastLogin: Date
}

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, unique: true },
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
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
)

// Create and return the Mongoose model for the User collection.
// If the model already exists, return the existing model; otherwise, create a new one.
export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema)
