import mongoose from 'mongoose'

export interface Item {
  readonly _id?: mongoose.Schema.Types.ObjectId
  ids: ItemIds
  mainCategory: string
  secondaryCategory: string
  name: string
  author?: string
  brand?: string
  description: string
  imageUrl: string
  condition: number
  maxLoanPeriod: number
  location: Location
  ownerId: string
  postingStatus: string
  isAvailable: boolean
  readonly createdAt?: Date
  updatedAt?: Date
}

interface ItemIds {
  isbn?: string
  danacode?: string
  barcode?: string
}

interface Location {
  city: string
  streetName: string
  streetNumber: string
  zipCode: string | undefined
  coordinates?: {
    lat: number
    lng: number
  }
  country?: string
}

// interface AlertSubscriber {
//   readonly subscriberId: mongoose.Schema.Types.ObjectId
//   alertsRequested: boolean
//   readonly createdAt: Date
//   updatedAt: Date
// }
