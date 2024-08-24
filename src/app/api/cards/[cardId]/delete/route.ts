import { Item } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const cardId = req.nextUrl.pathname.split('/')[4]
    await Item.updateOne({ _id: cardId }, { $set: { postingStatus: 'deleted' } })

    return NextResponse.json(
      { message: 'Item marked as deleted' },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    )
  }
}
