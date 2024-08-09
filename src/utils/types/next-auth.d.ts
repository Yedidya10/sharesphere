import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      phone: string
      address: {
        streetName: string
        streetNumber: string
        city: string
        zipCode: number
        country: string
      }
      role: string
    } & DefaultSession['user']
  }
}
