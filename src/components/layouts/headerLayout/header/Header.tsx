'use client'

import ItemPostButton from '@/components/buttons/itemPostButton/ItemPostButton'
import Logo from '@/components/logo/Logo'
import AdbIcon from '@mui/icons-material/Adb'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import Account from '../account/Account'

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

const pages = ['Products', 'Pricing', 'Blog']

const Header: React.FC<IHeader> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  const { t } = useTranslation('header')
  const logIn = t('log-in')

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: 2000 }}
      color="default"
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <DashboardIcon
            sx={{
              color: 'default',
              mr: 2,
              transform: 'translateY(-2px)',
            }}
          />
          <Logo sampleTextProp={''} label={''} />
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <ItemPostButton label={''} />
          <Account buttonText={logIn} label={''} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
