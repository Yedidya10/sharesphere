// Import the 'db' object
import { Card } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Get the current user ID from the URL
    const currentUserId = req.nextUrl.href.split('/')[6]

     // Find cards that have the specified user as the current borrower
     const cards = await Card.find({
      'currentBorrower.borrowerId': currentUserId
    }).exec()

    // If no cards are found, return a 404 response
    if (!cards || cards.length === 0) {
      return NextResponse.json(
        { error: 'No cards found for this current borrower', message: 'No cards found for this current borrower' },
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
