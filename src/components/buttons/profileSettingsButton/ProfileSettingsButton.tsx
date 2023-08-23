'use client'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useSession } from 'next-auth/react'
import * as React from 'react'

export interface IProfileSettingsButton {
  buttonText: string
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  open: boolean
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

const ProfileSettingsButton: React.FC<IProfileSettingsButton> = ({
  primary = false,
  label,
  buttonText,
  handleClick,
  open,
}) => {
  const { data: session } = useSession()

  return (
    <Tooltip title="Profile settings">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'profile-settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="Profile settings"
      >
        <Avatar
          src={session?.user?.image ?? '/default-profile-image.png'}
          alt="Profile Image"
        />
      </IconButton>
    </Tooltip>
  )
}

export default ProfileSettingsButton
