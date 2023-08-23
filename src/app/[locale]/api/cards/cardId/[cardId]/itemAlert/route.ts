// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PATCH(req: NextRequest) {
  try {
    // Get the card ID from the URL
    const cardId = req.nextUrl.pathname.split('/')[-2]

    console.log('cardId:', cardId)

    // Get the data from the request body
    const data = await req.json()

    // Check if subscriberId already exists in alertSubscribers array
    const card = await Card.findOne({
      _id: cardId,
      alertSubscribers: {
        $elemMatch: { subscriberId: data.itemAlert.subscriberId },
      },
    })

    console.log('Card:', card)

    if (card) {
      // User is already subscribed
      return NextResponse.json(
        { error: 'User is already subscribed' },
        { status: 400 } // You can choose an appropriate HTTP status code for this scenario
      )
    } else {
      // Update the card in the database
      await Card.updateOne(
        { _id: cardId },
        { $push: { alertSubscribers: data.itemAlert } }
      )

      console.log('Card updated:', data)

      // Return a success response
      return NextResponse.json(
        { message: 'Card updated:', data },
        { status: 200 }
      )
    }
  } catch (err: any) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    )
  }
}
