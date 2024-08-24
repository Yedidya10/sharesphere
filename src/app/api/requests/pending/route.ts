import { Request } from '../../../../models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const itemId = req.nextUrl.href.split('/')[6]
  console.log('itemId:', itemId)

  try {
    const requests = await Request.find({ itemId }).exec()
    // console.log('requests:', requests)
    const pendingRequests = requests.filter(
      (request) => request.status.value === 'pending'
    )

    if (!requests) {
      return NextResponse.json({ error: 'Requests not found' }, { status: 404 })
    }

    if (!pendingRequests) {
      return NextResponse.json(
        { error: 'No pending requests found' },
        { status: 404 }
      )
    }

    // console.log('pendingRequests:', pendingRequests)
    return NextResponse.json(pendingRequests)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
