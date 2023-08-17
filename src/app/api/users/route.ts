// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { User } from "../dbModels"
import { NextResponse, NextRequest } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function GET(req: NextRequest) {
  try {
    // Get all users from the database
    const users = await User.find({}).exec()

    // Return a 200 response
    return NextResponse.json({ message: 'users:', users })
  } catch (err) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
