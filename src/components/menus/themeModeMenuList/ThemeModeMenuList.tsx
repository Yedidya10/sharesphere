'use client'

import themeModeState from '@/recoils/themeMode/themeModeState'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useRecoilState } from 'recoil'

export interface IThemeModeMenuList {
  handleCloseMenu: () => void
  handleBackToSettings: () => void
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ThemeModeMenuList be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ThemeModeMenuList contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ThemeModeMenuList: React.FC<IThemeModeMenuList> = ({
  primary = false,
  label,
  handleCloseMenu,
  handleBackToSettings,
}) => {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState)

  // const handleDeviceMode = () => {
  //   setThemeMode('device')
  //  handleCloseMenu()
  // }

  const handleLightMode = () => {
    setThemeMode('light')
    handleCloseMenu()
  }

  const handleDarkMode = () => {
    setThemeMode('dark')
    handleCloseMenu()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          paddingBlockEnd: 1,
          paddingInlineStart: 1,
        }}
      >
        <Tooltip title="Back">
          <IconButton
            aria-label="back"
            size="small"
            onClick={handleBackToSettings}
          >
            <ArrowBackIcon
              sx={{
                '&.MuiSvgIcon-root': {
                  transform: 'scaleX(-1)',
                },
              }}
            />
          </IconButton>
        </Tooltip>
        <Typography>Appearance</Typography>
      </Box>
      <Divider />
      <MenuList disablePadding>
        {/* <MenuItem component={Button} onClick={handleDeviceMode}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Using device settings
        </MenuItem> */}
        <MenuItem
          component={Button}
          onClick={handleLightMode}
          disabled={themeMode === 'light'}
          sx={{
            width: '100%',
          }}
        >
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          Light Mode
        </MenuItem>
        <MenuItem
          component={Button}
          onClick={handleDarkMode}
          disabled={themeMode === 'dark'}
          sx={{
            width: '100%',
          }}
        >
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          Dark Mode
        </MenuItem>
      </MenuList>
    </>
  )
}

export default ThemeModeMenuList
