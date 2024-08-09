// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PATCH(req: NextRequest) {
  try {
    // Get the card ID from the URL
    const cardId = req.nextUrl.pathname.split('/')[4]

    // Get the data from the request body
    const data = await req.json()

    // Check if subscriberId already exists in alertSubscribers array
    const card = await Card.findOne({
      _id: cardId,
      alertSubscribers: {
        $elemMatch: { subscriberId: data.itemAlert.subscriberId },
      },
    })

    if (card) {
      // User is already subscribed
      return NextResponse.json(
        { error: 'User is already subscribed' },
        // Return a 409 response: Conflict
        { status: 409 }
      )
    } else {
      // Update the card in the database
      await Card.updateOne(
        { _id: cardId },
        {
          $push: {
            alertSubscribers: {
              ...data.itemAlert,
              updatedAt: new Date(), // Set updatedAt timestamp
            },
          },
        }
      )

      // Return a success response
      return NextResponse.json(
        { message: 'Card updated:', data },
        { status: 200 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      // Return a 500 response: Internal Server Error
      { status: 500 }
    )
  }
}
