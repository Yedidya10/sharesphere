import connectDB from '@/lib/mongodb'
import BookCard from '@/models/bookCard'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    console.log('CONNECTED TO MONGO')

    const bookCard = await BookCard.create(req.body)
    console.log('CREATED DOCUMENT', bookCard)
  } catch (error) {
    console.log(error)
  }
}
