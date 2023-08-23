// Import the 'db' object
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Get the current user ID from the URL
    const currentUserId = req.nextUrl.href.split('/').pop()

    // Find cards that have the specified owner ID
    const cards = await Card.find({ owner: currentUserId }).exec()

    // If no cards are found, return a 404 response
    if (!cards || cards.length === 0) {
      return NextResponse.json(
        { error: 'No cards found for this user', message: 'No cards found' },
        { status: 404 }
      )
    }

    // Return the cards
    return NextResponse.json({ cards })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message },
      { status: 500 }
    )
  }
}
