'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { signIn, signOut, useSession } from 'next-auth/react'
import * as React from 'react'
import Link from 'next/link'

export interface IAccount {
  buttonText: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the Account be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Account contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SETTINGS_LINKS = [
  { text: 'Profile', href: '/profile', icon: AccountCircleIcon },
  { text: 'Account', href: '/account', icon: ManageAccountsIcon },
  { text: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { text: 'Logout', href: '/', icon: LogoutIcon },
]

const Account: React.FC<IAccount> = ({
  primary = false,
  label,
  buttonText,
}) => {
  const { data: session } = useSession()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    signOut()
  }

  return (
    <>
      {session ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                src={session.user?.image ?? '/default-profile-image.png'}
                alt="Profile Image"
              />
            </IconButton>
          </Tooltip>
          {/* <Typography>
            {session.user?.name
              ? session.user.name.charAt(0).toUpperCase() +
                session.user.name.slice(1).toLowerCase()
              : ''}
          </Typography> */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem component={Link} href={'/profile'} onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            */}
            <Divider />
            <MenuItem component={Link} href={'/settings'} onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem component={Link} href={'/'} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Button onClick={() => signIn()}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          {buttonText}
        </Button>
      )}
    </>
  )
}

export default Account
