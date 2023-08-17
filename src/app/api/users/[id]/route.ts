// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { User } from "@/app/api/dbModels"
import { NextResponse, NextRequest } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PATCH(req: NextRequest) {
  try {
    // Get the data from the request body
    const data = await req.json()

    // Update the user with the given id
    const user = await User.updateOne({ _id: data.id }, { $set: data })

    // Return a 200 response
    return NextResponse.json({ message: 'user updated', user })
  } catch (err) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
