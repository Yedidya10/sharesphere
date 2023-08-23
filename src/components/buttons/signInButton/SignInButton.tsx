'use client'

import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import { signIn } from 'next-auth/react'
import * as React from 'react'

export interface ISignInButton {
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

const SignInButton: React.FC<ISignInButton> = ({
  primary = false,
  label,
  buttonText,
}) => {
  return (
    <Button onClick={() => signIn()} sx={{
      gap: 1,
    }}>
      <LoginIcon fontSize="small" />
      {buttonText}
    </Button>
  )
}

export default SignInButton
