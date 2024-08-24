import { Item, Request } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const currentUserId = req.nextUrl.href.split('/')[6]
    const requestedItems = await Request.find({
      borrowerId: currentUserId,
    }).exec()

    if (!requestedItems || requestedItems.length === 0) {
      return NextResponse.json(
        {
          error: 'No items  found',
          message: 'No items found for this current borrower',
        },
        { status: 404 }
      )
    }

    const requests = requestedItems.filter(
      (item) =>
        item.status.value === 'pending' || item.status.value === 'accepted'
    )

    const requestsItems = await Item.find({
      _id: { $in: requests.map((item) => item.itemId) },
    }).exec()

    // const pendingRequests = requestedItems.filter(
    //   (item) => item.status.value === 'pending'
    // )

    // const acceptedRequests = requestedItems.filter(
    //   (item) => item.status.value === 'accepted'
    // )

    // const acceptedRequestsItems = await Item.find({
    //   _id: { $in: acceptedRequests.map((item) => item.itemId) },
    // }).exec()

    // const pendingRequestsItems = await Item.find({
    //   _id: { $in: pendingRequests.map((item) => item.itemId) },
    // }).exec()

    return NextResponse.json(requestsItems)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message },
      { status: 500 }
    )
  }
}
