'use client'

import Settings from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'

export interface IGeneralSettingsButton {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  open: boolean
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
   * How large should the Account be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Account contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const GeneralSettingsButton: React.FC<IGeneralSettingsButton> = ({
  primary = false,
  label,
  buttonText,
  handleClick,
  open,
}) => {
  return (
    <Tooltip title="Settings" >
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Settings />
      </IconButton>
    </Tooltip>
  )
}

export default GeneralSettingsButton
