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
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import SettingsMenu from '../../menus/settingsMenu/SettingsMenu'

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

const Header: React.FC<IHeader> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  const { data: session, status } = useSession()
  const { t } = useTranslation('header')
  const logIn = t('log-in')

  return (
    <AppBar position="fixed" color="default" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DashboardIcon
            sx={{
              color: 'default',
              mr: 2,
              transform: 'translateY(-2px)',
            }}
          />
          <Logo sampleTextProp={''} label={''} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <ItemPostButton label={''} />
          {status === 'authenticated' && (
            <ProfileNotificationsButton label={''} />
          )}
          <SettingsMenu buttonText={logIn} label={''} />
          {status === 'unauthenticated' && (
            <SignInButton label={''} buttonText={'כניסה'} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
