import { Item } from '@/models/dbModels'

import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const cardId = req.nextUrl.pathname.split('/')[4]
    const data = await req.json()
    const item = await Item.findById(cardId)

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await item.updateOne({
      _id: cardId,
      $set: data.updatedCard,
    })

    return NextResponse.json({ message: 'Item updated:', item })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Something went wrong: ' + err.message },
      { status: 500 }
    )
  }
}
