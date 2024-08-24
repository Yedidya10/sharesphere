import { Item } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const currentUserId = req.nextUrl.href.split('/')[6]
    console.log('currentUserId', currentUserId)
    const items = await Item.find({ ownerId: currentUserId }).exec()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: 'No items found for this user' },
        { status: 404 }
      )
    }

    return NextResponse.json( items , { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message },
      { status: 500 }
    )
  }
}
