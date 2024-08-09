import mongoose from 'mongoose'

interface ItemRequestDates {
  pickupDate: Date
  returnDate: Date
  borrowingPeriod: number
  readonly createdAt: Date
  updatedAt: Date
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

export interface Request {
  readonly _id?: mongoose.Schema.Types.ObjectId
  readonly itemId: mongoose.Schema.Types.ObjectId
  readonly borrowerId: mongoose.Schema.Types.ObjectId
  dates: ItemRequestDates
  status: ItemRequestStatus[]
  readonly createdAt: Date
  updatedAt: Date
}
