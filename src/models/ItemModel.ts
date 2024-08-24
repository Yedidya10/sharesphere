import mongoose from 'mongoose'

// Step 1: Define the Mongoose schema for the Item model
const itemSchema = new mongoose.Schema(
  {
    cardIds: {
      isbn: { type: String },
      danacode: { type: String },
      barcode: { type: String },
    },
    mainCategory: { type: String },
    secondaryCategory: { type: String },
    name: { type: String },
    author: { type: String },
    brand: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    condition: { type: String },
    maxLoanPeriod: { type: Number },
    location: {
      city: { type: String },
      streetName: { type: String },
      streetNumber: { type: String },
      zipCode: { type: String },
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    postingStatus: {
      type: String,
      enum: ['inReview', 'published', 'inactive', 'deleted'],
      default: 'inReview',
    },
    isAvailable: { type: Boolean, default: true },
    // alertSubscribers: [
    //   {
    //     subscriberId: { type: mongoose.Schema.Types.ObjectId },
    //     alertsRequested: { type: Boolean, default: true },
    //     createdAt: { type: Date },
    //     updatedAt: { type: Date },
    //   },
    // ],
  },
  {
    timestamps: true, // Enable timestamps option, which creates "createdAt" and "updatedAt" fields
    selectPopulatedPaths: false, // Prevents versioning issues with populated fields
  }
)

// Step 2: Create and return the Mongoose model for the Card collection.
// If the model already exists, return the existing model; otherwise, create a new one.
export const Item =
  mongoose.models.Item || mongoose.model<mongoose.Document>('Item', itemSchema)
