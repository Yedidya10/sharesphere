import { DefaultSession } from 'next-auth'
import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      role: string
    } & DefaultSession['user']
  }
  interface User {
    email: string
    image: string
    firstName: string
    lastName: string
    role: string
    phone?: string
    address: {
      streetName?: string
      streetNumber?: string
      city?: string
      zipCode?: number
      country?: string
    }

    lastLogin: Date
    updatedAt: Date
    createdAt: Date
  }
}
