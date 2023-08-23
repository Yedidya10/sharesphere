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
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import { useRecoilState } from 'recoil'
import CheckIcon from '@mui/icons-material/Check'

export interface ILanguageMenuList {
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
   * How large should the LanguageMenuList be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * LanguageMenuList contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const LanguageMenuList: React.FC<ILanguageMenuList> = ({
  primary = false,
  label,
  handleCloseMenu,
  handleBackToSettings,
}) => {
  const { lang } = useTranslation('common')
  const [language, setLanguage] = React.useState<string>('he')

  const languageList = [
    {
      value: 'he',
      label: 'Hebrew',
    },
    {
      value: 'en',
      label: 'English',
    },
  ]

  const handleSelectedLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setLanguage('en')

    console.log(event.currentTarget.textContent)
    console.log(language)

    document.documentElement.lang = language
    console.log(document.documentElement.lang)
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
        <Typography>Choose language</Typography>
      </Box>
      <Divider />
      <MenuList disablePadding>
        <MenuItem
          component={Button}
          onClick={handleSelectedLanguage}
          sx={{
            width: '100%',
          }}
        >
          <ListItemIcon>
            {language === 'he' ? <CheckIcon /> : null}
          </ListItemIcon>
          Hebrew
        </MenuItem>
        <MenuItem
          component={Button}
          onClick={handleSelectedLanguage}
          sx={{
            width: '100%',
          }}
        >
          <ListItemIcon>
            {language === 'en' ? <CheckIcon /> : null}
          </ListItemIcon>
          English
        </MenuItem>
      </MenuList>
    </>
  )
}

export default LanguageMenuList
