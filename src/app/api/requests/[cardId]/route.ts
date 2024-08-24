import { Request } from '../../../../models/dbModels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const itemId = req.nextUrl.href.split('/')[5]

  try {
    const requests = await Request.find({ itemId: itemId })

    if (!requests) {
      return NextResponse.json({ error: 'Requests not found' }, { status: 404 })
    }

    return NextResponse.json(requests)
  } catch (error: any) {
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
    console.log('request:', request)
    await request.save()

    if (!request) {
      return NextResponse.json({ error: 'Request not created' }, { status: 400 })
    }

    return NextResponse.json(
      { message: 'Request created successfully', request },
      { status: 201 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    )
  }
}
