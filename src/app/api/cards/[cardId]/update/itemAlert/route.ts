import { Item } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const cardId = req.nextUrl.pathname.split('/')[4]
    const data = await req.json()

    const item = await Item.findOne({
      _id: cardId,
      alertSubscribers: {
        $elemMatch: { subscriberId: data.itemAlert.subscriberId },
      },
    })

    if (item) {
      return NextResponse.json(
        { error: 'User is already subscribed' },
        { status: 409 }
      )
    } else {
      await Item.updateOne(
        { _id: cardId },
        {
          $push: {
            alertSubscribers: {
              ...data.itemAlert,
              updatedAt: new Date(),
            },
          },
        }
      )

      return NextResponse.json(
        { message: 'Item updated:', data },
        { status: 200 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
