'use client'

import GeneralSettingsButton from '@/components/buttons/generalSettingsButton/GeneralSettingsButton'
import ProfileSettingsButton from '@/components/buttons/profileSettingsButton/ProfileSettingsButton'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Menu from '@mui/material/Menu'
import { signOut, useSession } from 'next-auth/react'
import * as React from 'react'
import LanguageMenuList from '../languageMenuList/LanguageMenuList'
import SettingsMenuList from '../settingsMenuList/SettingsMenuList'
import ThemeModeMenuList from '../themeModeMenuList/ThemeModeMenuList'

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
    if (themeModeMenuOpen || languageMenuListOpen) {
      setThemeModeMenuOpen(false)
      setLanguageMenuListOpen(false)
    }
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
    <Box
      
    >
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
    </Box>
  )
}

export default SettingsMenu
