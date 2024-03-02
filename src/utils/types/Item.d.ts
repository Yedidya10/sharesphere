import mongoose from 'mongoose'

export interface ItemCore {
  _id?: mongoose.Schema.Types.ObjectId
  ids: ItemIds
  details: {
    mainCategory: string
    secondaryCategory: string
    name: string
    author?: string
    brand?: string
    description: string
    imageUrl: string
  }
  condition: number
  maxLoanPeriod: number
  location: Location
  owner: string
  // TODO: Add lender
  postingStatus: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ItemCoreWithLoanDetails extends ItemCore {
  allBorrowers: AllBorrowers | null
  requests: ItemRequest[] | null
  alertSubscribers?: AlertSubscriber[] | null
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
  previousBorrowers: PreviousBorrower[] | null
}

interface CurrentBorrower {
  borrowerId: mongoose.Schema.Types.ObjectId
  pickupDate: Date
  returnDate: Date
  loanPeriod: number
  createdAt: Date
  updatedAt: Date
}

interface PreviousBorrower {
  borrowerId: mongoose.Schema.Types.ObjectId
  pickupDate: Date
  returnDate: Date
  loanPeriod: number
}

interface ItemRequestStatus {
  requestStatus: string
  borrowerMessage?: string
  lenderMessage?: string
  createdAt: Date
  updatedAt: Date
}

export interface ItemRequest {
  borrowerId: mongoose.Schema.Types.ObjectId
  pickupDate: Date
  returnDate: Date
  loanPeriod: number
  status: ItemRequestStatus
  createdAt: Date
  updatedAt: Date
}

interface AlertSubscriber {
  subscriberId: mongoose.Schema.Types.ObjectId
  alertsRequested: boolean
  createdAt: Date
  updatedAt: Date
}
