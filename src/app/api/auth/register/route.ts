// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { User } from '@/models/dbModels'
// Import the Next.js server functions for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'
const bcrypt = require('bcrypt')

// Handle the HTTP POST request with the 'req' parameter containing the request data
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request body (req.json()) into 'userData'
    const userData = await req.json()

    // Check if the user already exists in the database
    const userExists = await User.exists({ email: userData.email })

    // If the user already exists, return a JSON response with an error message and status code 400 (Bad Request)
    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create a new 'User' instance using the parsed data
    const user = new User({
      ...userData,
      password: hashedPassword,
    })

    // Step 6: Save the user to the database by calling the 'save()' method
    await user.save()

    // Return a JSON response with a success message, the created 'user', and status code 201 (Created)
    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    )
  } catch (error: any) {
    // If an error occurs during card creation, handle the error
    console.error('Error creating user:', error?.message)
    // Return a JSON response with an error message and status code 500 (Internal Server Error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
