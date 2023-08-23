// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'

// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    // Get the card ID from the query parameters
    const cardId = req.nextUrl.pathname.split('/')[-2]
    console.log(cardId)

    // Get the data from the request body
    const data = await req.json()

    // Get the card from the database
    const card = await Card.findById(cardId)

    // If the card doesn't exist, return a 404 response
    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 })
    }

    // Update the card in the database
    await card.updateOne({
      _id: cardId,
      $set: data.updatedCard,
    })

    // Return a 200 response
    return NextResponse.json({ message: 'Card updated:', Card })
  } catch (err: any) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Something went wrong: ' + err.message },
      { status: 500 }
    )
  }
}
