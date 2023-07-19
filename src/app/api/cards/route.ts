import connectDB from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

const getAllCards = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log('CONNECTING TO MONGO')
    await connectDB()
    console.log('CONNECTED TO MONGO')

    res.json()
  } catch (error) {
    console.log(error)
    res.json()
  }
}
