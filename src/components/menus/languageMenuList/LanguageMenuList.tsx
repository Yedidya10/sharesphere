'use client'

import { usePathname, useRouter } from '@/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useParams } from 'next/navigation'
import * as React from 'react'

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
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()


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

  const handleLanguageChange = (lang: string) => {
    router.replace(pathname, { locale: lang })
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
        {languageList.map((lang) => (
          <MenuItem
            component={Button}
            key={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
            sx={{
              width: '100%',
            }}
          >
            <ListItemIcon>
              {lang.value === locale ? <CheckIcon fontSize="small" /> : null}
            </ListItemIcon>
            {lang.label}
          </MenuItem>
        ))}
      </MenuList>
    </>
  )
}

export default LanguageMenuList
