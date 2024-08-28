'use client'

import UserNotification from '@/components/userNotification/UserNotification'
import { Notification } from '@/utils/types/notification'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export interface IProfileNotificationsButton {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemAlertButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemAlertButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ProfileNotificationsButton: React.FC<IProfileNotificationsButton> = ({
  primary = false,
  label,
}) => {
  const { data: session, status } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)

    if (unreadNotificationsNum > 0) {
      const markAllAsRead = async () => {
        for (const notification of notifications) {
          if (notification.status === 'unread') {
            await handleMarkAsRead(String(notification._id))
          }
        }
      }
      markAllAsRead()
      setUnreadNotificationsNum(0)
    }
  }
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadNotificationsNum, setUnreadNotificationsNum] = useState(0)
  const handleCloseNotifications = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `/api/notifications/userId/${session?.user?.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data = await response.json()
        const visibleNotifications = await data.filter(
          (notification: Notification) => !notification.invisible
        )

        console.log('visibleNotifications:', visibleNotifications)
        setNotifications(visibleNotifications)
      } catch (error) {
        console.error('Failed to fetch notifications')
      }
    }
    if (session?.user?.id) {
      fetchNotifications()
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (status === 'authenticated' && notifications.length > 0) {
      setUnreadNotificationsNum(
        notifications.filter((notification) => notification.status === 'unread')
          .length
      )
    }
  }, [notifications, status])

  const handleMarkAsRead = async (notificationId: string) => {
    await fetch(`/api/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'read' }),
    })
  }

  const handleHideNotification = async (notificationId: string) => {
    await fetch(`/api/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invisible: true }),
    })

    setNotifications((prev) =>
      prev.filter(
        (notification) => String(notification.userId) !== notificationId
      )
    )
  }

  return (
    <>
      {status === 'authenticated' && (
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{
                padding: 1.5,
              }}
              aria-controls={open ? 'notifications-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Badge
                badgeContent={unreadNotificationsNum}
                color="error"
                overlap="circular"
              >
                <NotificationsIcon color={primary ? 'primary' : 'inherit'} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        id="notifications-menu"
        open={open}
        onClose={handleCloseNotifications}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList sx={{ width: '100%', maxWidth: 460 }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <>
                <MenuItem
                  // @ts-ignore
                  key={notification.user}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    paddingBlock: 1,
                  }}
                >
                  <UserNotification
                    title={notification.title}
                    handleMarkAsRead={async () =>
                      await handleMarkAsRead(String(notification._id))
                    }
                    handleCloseNotifications={handleCloseNotifications}
                    handleHideNotification={async () =>
                      await handleHideNotification(String(notification._id))
                    }
                    message={notification.message}
                    image={notification.image}
                    status={notification.status}
                    label={''}
                  />
                </MenuItem>
              </>
            ))
          ) : (
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                minWidth: 460,
                minHeight: 200,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: 'max-content',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                }}
              >
                No notifications
              </Typography>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  )
}

export default ProfileNotificationsButton
