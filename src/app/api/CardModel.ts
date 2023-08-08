// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose'
// const version = require('mongoose-version')

mongoose.Promise = global.Promise

// Get the MongoDB URI from the environment variables and connect to the database
// const mongoUri = process.env.MONGODB_URI!
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(mongoUri)
//     console.log('Database connected')
//   } catch (err: any) {
//     console.error(`MongoDB connection error: ${err.message}`)
//     throw new Error(err)
//   }
// }

// Function to define the Mongoose schema and model for the Card collection
export default function cardModel() {
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
      itemStatus: { type: String },
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
        },
        { timestamps: true }, // Add the timestamps option
      ],
    },
    {
      timestamps: true, // Enable timestamps option, which creates "createdAt" and "updatedAt" fields
      selectPopulatedPaths: false, // Prevents versioning issues with populated fields
    }
  )

  // Add the "versionKey" option to the schema
  // cardSchema.plugin(version, { collection: 'cards__versions' })

  // Step 2: Create and return the Mongoose model for the Card collection.
  // If the model already exists, return the existing model; otherwise, create a new one.
  return (
    mongoose.models.Card ||
    mongoose.model<mongoose.Document>('Card', cardSchema)
  )
}
