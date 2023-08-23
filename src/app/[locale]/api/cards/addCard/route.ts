// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { Card } from '@/models/dbModels'
import { NextApiRequest } from 'next'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// Handle the HTTP POST request with the 'req' parameter containing the request data
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request body (req.json()) into 'cardData'
    const cardData = await req.json()
    // Create a new 'Card' instance using the parsed data
    const card = new Card(cardData)

    // Step 6: Save the card to the database by calling the 'save()' method
    await card.save()

    // Return a JSON response with a success message, the created 'card', and status code 201 (Created)
    return NextResponse.json(
      { message: 'Card created successfully', card },
      { status: 201 }
    )
  } catch (error: any) {
    // If an error occurs during card creation, handle the error
    console.error('Error creating card:', error?.message)
    // Return a JSON response with an error message and status code 500 (Internal Server Error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// This is the API route that will be called when the form is submitted
export async function PATCH(
  req: NextRequest & NextApiRequest & { query: { [key: string]: string } }
) {
  try {
    // Get the card ID from the query parameters
    const cardId = req.query['cardId']
    // Get the data from the request body
    const data = await req.json()
    console.log(data)

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
  } catch (err) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
