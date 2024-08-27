import { NextRequest, NextResponse } from 'next/server'
import { Notification } from '../../../../models/NotificationModel'

export async function PATCH(req: NextRequest) {
  try {
    const notificationId = req.nextUrl.href.split('/')[5]
    const notificationData = await req.json()
    const notification = await Notification.findById(notificationId)

    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }

    if (notificationData.invisible !== undefined) {
      notification.invisible = notificationData.invisible
      await notification.save()
      return NextResponse.json(notification)
    }

    if (notificationData.status) {
      notification.status = notificationData.status
      await notification.save()
      return NextResponse.json(notification)
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
