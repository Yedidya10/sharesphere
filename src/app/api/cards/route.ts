// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '../dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextResponse } from 'next/server'

// Handle the HTTP GET request
export async function GET() {
  try {
    const cards = await Card.find({}).exec()

    return NextResponse.json({ cards }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching cards:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
