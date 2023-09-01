// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { User } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function POST(req: NextRequest) {
  try {
    // Get the userData from the request body
    const user = await req.json()

    // Create a new user with the userData
    const newUser = new User(user)

    // Save the new user to the database
    await newUser.save()

    // Return a 201 response
    return NextResponse.json(
      { message: 'User created:', user: newUser },
      { status: 201 }
    )
  } catch (err) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
