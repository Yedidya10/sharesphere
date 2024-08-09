import mongoose from 'mongoose'

// Step 1: Define the Mongoose schema for the request model
const requestSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId },
    borrowerId: { type: mongoose.Schema.Types.ObjectId },
    dates: {
      pickupDate: { type: Date },
      returnDate: { type: Date },
      loanPeriod: { type: Number },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
    },
    status: {
      currentStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'removed'],
      },
      borrowerMessage: { type: String },
      lenderMessage: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    timestamps: true, // Enable timestamps option, which creates "createdAt" and "updatedAt" fields
    selectPopulatedPaths: false, // Prevents versioning issues with populated fields
  }
)

// Step 2: Create and return the Mongoose model for the Request collection.
// If the model already exists, return the existing model; otherwise, create a new one.
export const Request =
  mongoose.models.Request ||
  mongoose.model<mongoose.Document>('Request', requestSchema)
