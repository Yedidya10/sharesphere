'use client'

import ItemPostButton from '@/components/buttons/itemPostButton/ItemPostButton'
import ProfileNotificationsButton from '@/components/buttons/profileNotificationsButton/ProfileNotificationsButton'
import SignInButton from '@/components/buttons/signInButton/SignInButton'
import Logo from '@/components/logo/Logo'
import AdbIcon from '@mui/icons-material/Adb'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import SettingsMenu from '../../menus/settingsMenu/SettingsMenu'
import MessagesButton from '@/components/buttons/messagesButton/MessagesButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { NextLinkComposed } from '@/components/mui/Link'


export interface IHeader {
  sampleTextProp: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the Header be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Header contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const pages = ['About', 'Contact', 'FAQ', 'Donate']
const navLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Donate', path: '/donate' },
]

const Header: React.FC<IHeader> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  const logIn = 'Log In'
  const { data: session, status } = useSession()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="fixed" color="default" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo sampleTextProp={''} label={''} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.title}
                  component={NextLinkComposed}
                  to={link.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {link.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
            {navLinks.map((link) => (
              <MenuItem
                key={link.title}
                component={NextLinkComposed}
                to={link.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {link.title}
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ItemPostButton label={''} />
            {status === 'authenticated' && (
              <>
                <ProfileNotificationsButton label={''} />
                <MessagesButton label={''} />
              </>
            )}
            <SettingsMenu buttonText={logIn} label={''} />
            {status === 'unauthenticated' && (
              <SignInButton label={''} buttonText={'כניסה'} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
