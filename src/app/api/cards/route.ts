// Import the 'db' object from "@/app/api/carddb" that contains the Card model
import { db } from '@/app/api/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// Handle the HTTP GET request
export async function GET(res: NextResponse) {
  try {
    const cards = await db.Card.find({}).exec()
    return NextResponse.json(cards)
  } catch (error) {
    console.error('Error fetching cards:', error?.message)
    return NextResponse.json({ error: 'Internal server error' })
  }
}

// Handle the HTTP POST request with the 'req' parameter containing the request data
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request body (req.json()) into 'cardData'
    const cardData = await req.json()
    // Create a new 'Card' instance using the parsed data
    const card = new db.Card(cardData)

    // Step 6: Save the card to the database by calling the 'save()' method
    await card.save()

    // Return a JSON response with a success message, the created 'card', and status code 201 (Created)
    return NextResponse.json(
      { message: 'Card created successfully', card },
      { status: 201 }
    )
  } catch (error) {
    // If an error occurs during card creation, handle the error
    console.error('Error creating card:', error?.message)
    // Return a JSON response with an error message and status code 500 (Internal Server Error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
