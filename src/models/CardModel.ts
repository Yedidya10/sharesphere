// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose'

// Step 1: Define the Mongoose schema for the card model
const cardSchema = new mongoose.Schema(
  {
    cardIds: {
      isbn: { type: String },
      danacode: { type: String },
      barcode: { type: String },
    },
    details: {
      category: { type: String },
      name: { type: String },
      author: { type: String },
      brand: { type: String },
      description: { type: String },
      imageUrl: { type: String },
    },
    condition: { type: String },
    maxLoanPeriod: { type: Number },
    location: {
      city: { type: String },
      streetName: { type: String },
      streetNumber: { type: String },
      zipCode: { type: String },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: { type: String },
    allBorrowers: [
      {
        borrowerId: { type: mongoose.Schema.Types.ObjectId },
        borrowingDates: [
          {
            startDate: { type: Date },
            endDate: { type: Date },
          },
        ],
        loanPeriod: { type: Number },
      },
    ],
    currentBorrower: {
      borrowerId: { type: mongoose.Schema.Types.ObjectId },
      startDate: { type: Date },
      endDate: { type: Date },
      loanPeriod: { type: Number },
    },
    pendingRequests: [
      {
        borrowerId: { type: mongoose.Schema.Types.ObjectId },
        requestStartDate: { type: Date },
        requestEndDate: { type: Date },
        loanPeriod: { type: Number },
      },
    ],
    approvedRequests: [
      {
        borrowerId: { type: mongoose.Schema.Types.ObjectId },
        startDate: { type: Date },
        endDate: { type: Date },
        loanPeriod: { type: Number },
      },
    ],
    rejectedRequests: [
      {
        borrowerId: { type: mongoose.Schema.Types.ObjectId },
        requestExplanation: { type: String },
      },
    ],
    alertSubscribers: [
      {
        subscriberId: { type: mongoose.Schema.Types.ObjectId },
        alertsRequested: { type: Boolean, default: true },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true, // Enable timestamps option, which creates "createdAt" and "updatedAt" fields
    selectPopulatedPaths: false, // Prevents versioning issues with populated fields
  }
)

// Step 2: Create and return the Mongoose model for the Card collection.
// If the model already exists, return the existing model; otherwise, create a new one.
export const Card =
  mongoose.models.Card || mongoose.model<mongoose.Document>('Card', cardSchema)
