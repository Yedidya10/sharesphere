import mongoose from 'mongoose'

interface ItemRequestDates {
  pickupDate: Date
  returnDate: Date
  borrowingPeriod: number
}

interface ItemRequestStatus {
  value: string
}

export interface Request {
  readonly _id?: mongoose.Schema.Types.ObjectId
  readonly itemId: mongoose.Schema.Types.ObjectId
  readonly borrowerId: mongoose.Schema.Types.ObjectId
  dates: ItemRequestDates
  status: ItemRequestStatus
  messages: {
    borrowerMessage?: string
    lenderMessage?: string
  }
}
