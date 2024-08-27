import { NextRequest, NextResponse } from 'next/server'
import { Request } from '@/models/dbModels'

export async function GET(req: NextRequest) {
  const itemId = req.nextUrl.href.split('/')[5]
  const borrowerId = req.nextUrl.href.split('/')[6]

  try {
    const request = await Request.findOne({
      itemId,
      borrowerId,
    })

    if (!request) {
      return NextResponse.json(
        { error: 'Item not requested', status: 'not requested' },
        { status: 404 }
      )
    }

    const status = await request?.status?.value

    if (status === 'pending') {
      return NextResponse.json(
        { message: 'Request is pending', status: 'pending' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Item not requested', status: 'not requested' },
        { status: 404 }
      )
    }
  } catch (error: any) {
    console.error('Error fetching items:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const request = new Request(data)
    await request.save()

    return NextResponse.json(
      { message: 'Item updated:', data },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    )
  }
}
