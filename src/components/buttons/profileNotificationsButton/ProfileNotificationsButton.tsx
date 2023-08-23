import NotificationsIcon from '@mui/icons-material/Notifications'
import * as React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'notifications-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="notifications-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList sx={{ width: '100%', maxWidth: 460 }}>
          <MenuItem
            onClick={handleClose}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <NotificationsIcon sx={{ mt: 0.5 }} />
            <Box
              sx={{
                maxWidth: 460,
              }}
            >
              <Typography
                sx={{
                  fontWeight: '500',
                }}
              >
                Notification 1
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ipsum purus, bibendum sit amet vulputate eget, porta semper
                ligula.
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleClose}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <NotificationsIcon sx={{ mt: 0.5 }} />
            <Box
              sx={{
                maxWidth: 460,
              }}
            >
              <Typography
                sx={{
                  fontWeight: '500',
                }}
              >
                Notification 2
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ipsum purus, bibendum sit amet vulputate eget, porta semper
                ligula.
              </Typography>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  )
}

export default ProfileNotificationsButton
