import { Item } from '@/models/dbModels'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const itemData = await req.json()
    const item = new Item(itemData)
    await item.save()

    return NextResponse.json(
      { message: 'Item created successfully', item },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating Item:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest & NextApiRequest & { query: { [key: string]: string } }
) {
  try {
    const cardId = req.query['cardId']
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
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
