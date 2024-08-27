import { NextRequest, NextResponse } from 'next/server'
import { Notification } from '../../../models/NotificationModel'
import { Notification as NotificationType } from '@/utils/types/notification'

export async function POST(req: NextRequest) {
  try {
    const notificationData: NotificationType = await req.json()
    console.log('notificationData:', notificationData)
    const notification = new Notification(notificationData)
    await notification.save()

    console.log('notification:', notification)
    return NextResponse.json({ message: 'Notification created', notification })
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
