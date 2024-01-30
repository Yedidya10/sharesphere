// Import the 'db' object from "@/app/api/dbModels" that contains the Card model
import { User } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

// This is the API route that will be called when the form is submitted
export async function PUT(req: NextRequest) {
  try {
    // Get the data from the request body
    const updatedUser = await req.json()
    const userId = req.nextUrl.href.split('/')[5]

    // Update the user with the given id
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          // email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          phone: updatedUser.phone,
          image: updatedUser.imageUrl,
          'address.streetName': updatedUser.streetName,
          'address.streetNumber': updatedUser.streetNumber,
          'address.city': updatedUser.city,
          'address.zipCode': updatedUser.zipCode,
          'address.country': updatedUser.country,
        },
      },
      { new: true }
    )

    if (!user) {
      // If no user was found, return a 404 error
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

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

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.href.split('/')[5]
    const user = await User.findOne({ _id: userId })
    console.log(user)
    if (!user) {
      // If no user was found, return a 404 error
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    // Return a 200 response
    return NextResponse.json({ message: 'user found', user })
  } catch (err) {
    // If there is an error, return a 500 response with the error message
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
