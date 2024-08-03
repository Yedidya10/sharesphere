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
  owner: string
  postingStatus: string
  readonly createdAt?: Date
  updatedAt?: Date
}

export interface ItemCoreWithLoanDetails extends Item {
  allBorrowers: AllBorrowers
  requests: ItemRequest[]
  alertSubscribers: AlertSubscriber[]
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

interface AllBorrowers {
  currentBorrower: CurrentBorrower | null
  previousBorrowers: PreviousBorrower[]
}

interface CurrentBorrower {
  readonly borrowerId: mongoose.Schema.Types.ObjectId
  pickupDate: Date
  returnDate: Date
  loanPeriod: number
  readonly createdAt: Date
  updatedAt: Date
}

interface PreviousBorrower {
  readonly borrowerId: mongoose.Schema.Types.ObjectId
  pickupDate: Date
  returnDate: Date
  loanPeriod: number
  readonly createdAt: Date
}

interface ItemRequestStatus {
  value: string
  message?: {
    readonly _id?: mongoose.Schema.Types.ObjectId
    readonly sender: string
    readonly message: string
  }
  readonly createdAt: Date
}

// interface ItemRequestDatesFlexible {
//   startDate: Date
//   endDate: Date
//   borrowingPeriod: number
//   readonly createdAt: Date
//   updatedAt: Date
// }

interface ItemRequestDates {
  // flexibleDates: ItemRequestDatesFlexible
  pickupDate: Date
  returnDate: Date
  borrowingPeriod: number
  readonly createdAt: Date
  updatedAt: Date
}

export interface ItemRequest {
  readonly _id?: mongoose.Schema.Types.ObjectId
  readonly borrowerId: mongoose.Schema.Types.ObjectId
  dates: ItemRequestDates
  status: ItemRequestStatus[]
  readonly createdAt: Date
  updatedAt: Date
}

interface AlertSubscriber {
  readonly subscriberId: mongoose.Schema.Types.ObjectId
  alertsRequested: boolean
  readonly createdAt: Date
  updatedAt: Date
}
