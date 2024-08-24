import { Item } from '@/models/dbModels'
import { Request } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const ownerId = req.nextUrl.href.split('/')[6]
    const ownerItems = await Item.find({ ownerId }).exec()
    const itemIds = ownerItems.map((item) => item._id)
    const requests = await Request.find({
      itemId: { $in: itemIds },
    }).exec()
    const pendingRequests = requests.filter(
      (request) => request.status.value === 'pending'
    )

    const itemsWithRequests = await Item.find({
      _id: { $in: pendingRequests.map((request) => request.itemId) },
    }).exec()

    if (!itemsWithRequests) {
      return NextResponse.json({ error: 'No items found' }, { status: 404 })
    }

    return NextResponse.json({
      items: itemsWithRequests,
      requests: pendingRequests,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message },
      { status: 500 }
    )
  }
}
