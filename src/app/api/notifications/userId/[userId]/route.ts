import { NextRequest, NextResponse } from 'next/server'
import { Notification } from '../../../../../models/NotificationModel'

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.href.split('/')[6]
    const notifications = await Notification.find({ user: userId })

    if (!notifications) {
      return NextResponse.json(
        { error: 'Notifications not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(notifications)
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
