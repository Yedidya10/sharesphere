import { User } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'
const bcrypt = require('bcrypt')

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json()
    const userExists = await User.exists({ email: userData.email })

    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = new User({
      ...userData,
      password: hashedPassword,
    })

    await user.save()

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating user:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
