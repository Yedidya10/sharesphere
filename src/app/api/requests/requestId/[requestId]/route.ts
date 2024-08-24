import { Request } from '../../../../../models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  const requestId = req.nextUrl.href.split('/')[6]
  console.log('requestId:', requestId)
  const data = await req.json()
  const { status } = data

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId },
      { 'status.value': status }
    )

    if (!updatedRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Request updated' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
