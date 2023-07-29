// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose'
// Import the User model
import UserModel from './UserModel'

// Get the MongoDB URI from the environment variables and connect to the database
const mongoUri = process.env.MONGODB_URI!
mongoose.connect(mongoUri)
mongoose.Promise = global.Promise

// Function to define the Mongoose schema and model for the Card collection
export default function cardModel() {
  // Step 1: Define the Mongoose schema for the card model
  const cardSchema = new mongoose.Schema({
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
      ref: 'User',
      required: true,
    },
  })

  // Step 2: Create and return the Mongoose model for the Card collection.
  // If the model already exists, return the existing model; otherwise, create a new one.
  return (
    mongoose.models.Card ||
    mongoose.model<mongoose.Document>('Card', cardSchema)
  )
}
