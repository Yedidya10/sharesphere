import { Request } from '@/models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const cardId = req.nextUrl.pathname.split('/')[3]
    const data = await req.json()
    const requestId = data.requestId
    const requestStatus = data.status

    const item = await Request.updateOne(
      { itemId: cardId },
      {
        $set: {
          'status.value': requestStatus,
        },
      },
      {
        arrayFilters: [{ 'elem._id': requestId }],
      }
    )

    return NextResponse.json(
      { message: 'Request updated', item },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    )
  }
}
