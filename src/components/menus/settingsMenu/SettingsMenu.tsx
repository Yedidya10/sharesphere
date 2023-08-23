'use client'

import GeneralSettingsButton from '@/components/buttons/generalSettingsButton/GeneralSettingsButton'
import ProfileSettingsButton from '@/components/buttons/profileSettingsButton/ProfileSettingsButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import * as React from 'react'
import SettingsMenuList from '../settingsMenuList/SettingsMenuList'
import ThemeModeMenuList from '../themeModeMenuList/ThemeModeMenuList'
import LanguageMenuList from '../languageMenuList/LanguageMenuList'

export interface ISettingsMenu {
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
   * How large should the SettingsMenu be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SettingsMenu contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SettingsMenu: React.FC<ISettingsMenu> = ({
  primary = false,
  label,
  buttonText,
}) => {
  const { data: session, status } = useSession()

  const [anchorSettingsMenuEl, setAnchorSettingsMenuEl] =
    React.useState<null | HTMLElement>(null)
  const openSettingsMenu = Boolean(anchorSettingsMenuEl)

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorSettingsMenuEl(event.currentTarget)
  }

  const [themeModeMenuOpen, setThemeModeMenuOpen] = React.useState(false)
  const [languageMenuListOpen, setLanguageMenuListOpen] = React.useState(false)

  const handleOpenThemeModeMenu = () => {
    setThemeModeMenuOpen(true)
  }

  const handleOpenLanguageMenuList = () => {
    setLanguageMenuListOpen(true)
  }

  const handleCloseMenu = () => {
    setAnchorSettingsMenuEl(null)
    setThemeModeMenuOpen(false)
    setLanguageMenuListOpen(false)
  }

  const handleLogout = () => {
    setAnchorSettingsMenuEl(null)
    signOut()
  }

  const handleBackToSettings = () => {
    setThemeModeMenuOpen(false)
    setLanguageMenuListOpen(false)
  }

  return (
    <>
      {status === 'loading' && <CircularProgress />}
      {status === 'authenticated' && (
        <ProfileSettingsButton
          handleClick={handleOpenSettingsMenu}
          open={openSettingsMenu}
          buttonText={''}
          label={''}
        />
      )}
      {status === 'unauthenticated' && (
        <GeneralSettingsButton
          handleClick={handleOpenSettingsMenu}
          open={openSettingsMenu}
          buttonText={''}
          label={''}
        />
      )}
      <Menu
        anchorEl={anchorSettingsMenuEl}
        id="settings-menu"
        open={openSettingsMenu}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '100%',
            maxWidth: 300,
            minWidth: 240,
            borderRadius: 3,
            boxShadow: 4,
          },
        }}
      >
        {!themeModeMenuOpen && !languageMenuListOpen && (
          <SettingsMenuList
            label={''}
            handleCloseMenu={handleCloseMenu}
            handleOpenThemeModeMenu={handleOpenThemeModeMenu}
            handleLogout={handleLogout}
            handleOpenLanguageMenuList={handleOpenLanguageMenuList}
          />
        )}
        {themeModeMenuOpen && (
          <ThemeModeMenuList
            label={''}
            handleCloseMenu={handleCloseMenu}
            handleBackToSettings={handleBackToSettings}
          />
        )}
        {languageMenuListOpen && (
          <LanguageMenuList
            label={''}
            handleCloseMenu={handleCloseMenu}
            handleBackToSettings={handleBackToSettings}
          />
        )}
      </Menu>
    </>
  )
}

export default SettingsMenu
