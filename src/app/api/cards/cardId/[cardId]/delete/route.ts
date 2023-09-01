// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PATCH(req: NextRequest) {
  try {
    // Get the card ID from the url query parameters
    const cardId = req.nextUrl.pathname.split('/')[4]

    // Update the card in the database
    await Card.updateOne({ _id: cardId }, { $set: { status: 'deleted' } })

    // Return a 200 response
    return NextResponse.json(
      { message: 'Card marked as deleted' },
      { status: 200 }
    )
  } catch (err: any) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    )
  }
}
