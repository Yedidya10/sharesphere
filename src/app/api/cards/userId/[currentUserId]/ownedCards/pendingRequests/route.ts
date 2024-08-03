// Import the 'db' object
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Get the current user ID from the URL
    const currentUserId = req.nextUrl.href.split('/')[6]

    // Find cards that have the specified owner ID
    const cards = await Card.find({ owner: currentUserId }).exec()

    // Find cards that have pending requests
    const requests = cards.filter((card) => card.requests !== null && card.requests.length > 0)

    // If no cards are found, return a 404 response
    if (!requests || requests.length === 0) {
      return NextResponse.json(
        { error: 'No items requested', message: 'No items requested' },
        { status: 404 }
      )
    }

    // Return the cards
    return NextResponse.json({ cards: requests })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message },
      { status: 500 }
    )
  }
}
