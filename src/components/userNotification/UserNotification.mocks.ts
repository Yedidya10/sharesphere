import { IUserNotification } from './UserNotification'

const base: IUserNotification = {
  title: 'UserNotification',
  message: 'This is a user notification',
  label: '',
  status: '',
  handleMarkAsRead: function (): void {
    throw new Error('Function not implemented.')
  },
  handleCloseNotifications: function (): void {
    throw new Error('Function not implemented.')
  },
  handleHideNotification: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockUserNotificationProps = {
  base,
}
