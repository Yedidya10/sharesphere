// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card, Request } from '../../../../../models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// Handle the HTTP GET request
export async function GET(req: NextRequest) {
  const cardId = req.nextUrl.href.split('/')[3]
  const userId = req.nextUrl.href.split('/')[4]

  try {
    // Find the card with the given id
    const card = await Card.findOne({ _id: cardId })
    const request = await Request.findOne({ itemId: cardId, borrowerId: userId })

    if (!card) {
      // If no card was found, return a 404 error
      return NextResponse.json({ error: 'Card not found' }, { status: 404 })
    }

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Return the request status
    return NextResponse.json(request)
  } catch (error: any) {
    console.error('Error fetching cards:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// This is the API route that will be called when the form is submitted
export async function POST(req: NextRequest) {
  try {
    // Get the data from the request body
    const data = await req.json()

    // Create a new 'Request' object with the data
    const request = new Request(data)

    // Save the request to the database
    await request.save()

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
