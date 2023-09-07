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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { ListItemButton } from '@mui/material'

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

const navLinks = [
  { title: 'About', path: '/about' },
  { title: 'FAQ', path: '/faq' },
  // { title: 'Donate', path: '/donate' },
  // { title: 'Contact', path: '/contact' },
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
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Logo sampleTextProp={''} label={''} />
            <Box sx={{ display: { xxs: 'block', mds: 'none' } }}>
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
                  display: { xxs: 'block', md: 'none' },
                }}
              >
                {navLinks.map((link) => (
                  <MenuItem
                    key={link.title}
                    component={NextLinkComposed}
                    to={link.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, color: 'white', display: 'block' }}
                  >
                    {link.title}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <List
              sx={{
                display: { xxs: 'none', mds: 'flex' },
              }}
              component="nav"
            >
              {navLinks.map((link) => (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton
                    component={NextLinkComposed}
                    to={link.path}
                    onClick={handleCloseNavMenu}
                  >
                    {link.title}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <ItemPostButton label={''} />
            <ProfileNotificationsButton label={''} />
            {/* <MessagesButton label={''} /> */}
            <SignInButton label={''} />
            <SettingsMenu buttonText={logIn} label={''} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
