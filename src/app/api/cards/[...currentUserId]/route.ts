// Import the 'db' object
import { db } from '../../dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// Handle the HTTP GET request
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Get the owner ID from the query parameters
    console.log('req.nextUrl.searchParams:', req.nextUrl.searchParams)
    const currentUserId = req.nextUrl.searchParams.get('currentUserId')

    // Find cards that have the specified owner ID
    const cards = await db.Card.find({ owner: currentUserId }).exec()

    return NextResponse.json(cards)
  } catch (error: any) {
    console.error('Error fetching cards:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
