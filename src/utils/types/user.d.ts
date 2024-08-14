import mongoose from 'mongoose'

export interface User {
  _id?: mongoose.Schema.Types.ObjectId
  name: string
  firstName: string
  lastName: string
  address: {
    streetName: string
    streetNumber: string
    city: string
    zipCode: string
    country: string
  }
  email: string
  phone?: string
  image: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserWithRole extends User {
  role: string
}