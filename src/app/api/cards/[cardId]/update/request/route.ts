// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PATCH(req: NextRequest) {
  try {
    // Get the card ID from the URL
    const cardId = req.nextUrl.pathname.split('/')[3]

    // Get the data from the request body
    const data = await req.json()
    const requestId = data.requestId
    const requestStatus = data.status

    // Update the card with the new data
    const card = await Card.updateOne(
      { _id: cardId },
      {
        $set: {
          'requests.$[elem].status.currentStatus': requestStatus,
        },
      },
      {
        arrayFilters: [{ 'elem._id': requestId }],
      }
    )

  
    // Return a 200 response with the updated card
    return NextResponse.json(
      { message: 'Request updated', card },
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
