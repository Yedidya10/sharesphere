'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import * as React from 'react'
import LanguageIcon from '@mui/icons-material/Language'
import useTranslation from 'next-translate/useTranslation'

export interface ISettingsMenuList {
  handleCloseMenu: () => void
  handleOpenThemeModeMenu: () => void
  handleOpenLanguageMenuList: () => void
  handleLogout: () => void
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SettingsMenuList be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SettingsMenuList contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SettingsMenuList: React.FC<ISettingsMenuList> = ({
  primary = false,
  label,
  handleCloseMenu,
  handleOpenThemeModeMenu,
  handleOpenLanguageMenuList,
  handleLogout,
}) => {
  const { lang } = useTranslation('common')
  const { data: session, status } = useSession()

  return (
    <MenuList disablePadding>
      {status === 'authenticated' && (
        <MenuItem
          component={Link}
          href={'/dashboard'}
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
      )}
      <Divider />
      <MenuItem
        sx={{
          justifyContent: 'space-between',
        }}
        onClick={handleOpenThemeModeMenu}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            {useTheme().palette.mode === 'light' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </ListItemIcon>
          Appearance:{' '}
          {useTheme().palette.mode.charAt(0).toUpperCase() +
            useTheme().palette.mode.slice(1).toLowerCase()}
        </Box>
        <NavigateNextIcon
          fontSize="small"
          sx={{
            '&.MuiSvgIcon-root': {
              transform: 'scaleX(-1)',
            },
          }}
        />
      </MenuItem>

      <MenuItem
        sx={{
          justifyContent: 'space-between',
        }}
        onClick={handleOpenLanguageMenuList}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          Language: {lang === 'he' ? 'עברית' : 'English'}
        </Box>
        <NavigateNextIcon
          fontSize="small"
          sx={{
            '&.MuiSvgIcon-root': {
              transform: 'scaleX(-1)',
            },
          }}
        />
      </MenuItem>
      <Divider />
      {status === 'authenticated' && (
        <MenuItem component={Link} href={'/'} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      )}
    </MenuList>
  )
}

export default SettingsMenuList
