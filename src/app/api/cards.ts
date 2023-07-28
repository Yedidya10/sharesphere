import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

// Step 1: Define the Mongoose schema for your card model
interface Card {
  id: {
    isbn: string
    danacode: string
    barcode: string
  }
  details: {
    category: string
    name: string
    author?: string
    brand?: string
    description: string
    imageUrl: string
  }
  condition: string
  maxLoanPeriod: number
  location: {
    city: string
    streetName: string
    streetNumber: string
    zipCode: string
  }
  owner: {
    id: string
  }
}

const cardSchema = new mongoose.Schema<Card>({
  id: {
    isbn: { type: String, required: true },
    danacode: { type: String, required: true },
    barcode: { type: String, required: true },
  },
  details: {
    category: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String },
    brand: { type: String },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  condition: { type: String, required: true },
  maxLoanPeriod: { type: Number, required: true },
  location: {
    city: { type: String, required: true },
    streetName: { type: String, required: true },
    streetNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  owner: {
    id: { type: String, required: true },
  },
})

// Step 2: Create a Mongoose model using the schema
const CardModel =
  mongoose.models.Card || mongoose.model<Card>('Card', cardSchema)

// Step 3: Connect to your MongoDB database
const mongoUri = process.env.MONGODB_URI!
mongoose.connect(mongoUri)

// Step 4: Define the API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Step 5: Create a new card from the request body
    const cardData: Card = req.body
    const card = new CardModel(cardData)

    // Step 6: Save the card to the database
    await card.save()

    return res.status(201).json({ message: 'Card created successfully', card })
  } catch (error) {
    console.error('Error creating card:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
