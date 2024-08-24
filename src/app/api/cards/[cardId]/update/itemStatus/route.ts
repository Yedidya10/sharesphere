import { Item } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const cardId = req.nextUrl.pathname.split('/')[3]
    const data = await req.json()
    const item = await Item.findById(cardId)

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await Item.updateOne(
      { _id: cardId },
      { $set: { postingStatus: data.postingStatus } }
    )

    return NextResponse.json({ message: 'Item updated:', item })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Something went wrong: ' + err.message },
      { status: 500 }
    )
  }
}
