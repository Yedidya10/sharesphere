'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Badge from '@mui/material/Badge'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

export interface IUserNotification {
  title: string
  message: string
  image?: string
  status: string
  handleMarkAsRead: () => void
  handleCloseNotifications: () => void
  handleHideNotification: () => void
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the UserNotification be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * UserNotification contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const UserNotification: React.FC<IUserNotification> = ({
  primary = false,
  label,
  title,
  image,
  message,
  status,
  handleMarkAsRead,
  handleCloseNotifications,
  handleHideNotification,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleHideClick = () => {
    handleHideNotification()
    handleClose()
    handleCloseNotifications()
  }

  const ITEM_HEIGHT = 48

  return (
    <Box
      sx={{
        maxWidth: 460,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 460,
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 2,
        }}
        onClick={handleMarkAsRead}
      >
        <Badge
          variant="dot"
          color="error"
          overlap="circular"
          invisible={status === 'read'}
        >
          <NotificationsIcon sx={{ mt: 0.5 }} color="primary" />
        </Badge>
        <Box>
          <Typography
            variant="h6"
            component={'h2'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
              fontSize: 16,
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
            }}
          >
            {message}
          </Typography>
        </Box>
        {image && (
          <Image src={image} alt="Notification" width={60} height={60} />
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        <MenuItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          onClick={handleHideClick}
        >
          <VisibilityOffOutlinedIcon
            sx={{
              scale: 0.8,
            }}
          />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Hide Notification
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserNotification
