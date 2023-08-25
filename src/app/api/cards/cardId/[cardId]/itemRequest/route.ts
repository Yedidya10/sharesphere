// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PATCH(req: NextRequest) {
  try {
    // Get the card ID from the URL
    const cardId = req.nextUrl.pathname.split('/')[-2]

    // Get the data from the request body
    const data = await req.json()

    // Update the card in the database
    await Card.updateOne(
      { _id: cardId },
      { $push: { pendingRequests: data.itemLoanRequest } }
    )

    console.log('Card updated:', data)

    // Return a 200 response
    return NextResponse.json(
      { message: 'Card updated:', data },
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
