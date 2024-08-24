import mongoose from 'mongoose'

// Step 1: Define the Mongoose schema for the request model
const requestSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    borrowerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    dates: {
      pickupDate: { type: Date, required: true },
      returnDate: { type: Date, required: true },
      borrowingPeriod: { type: Number, required: true },
    },
    status: {
      value: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected', 'removed'],
      },
    },
    messages: {
      borrowerMessage: { type: String, required: false },
      lenderMessage: { type: String, required: false },
    },
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
