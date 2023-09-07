'use client'

import LoginIcon from '@mui/icons-material/Login'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { signIn, useSession } from 'next-auth/react'
import * as React from 'react'

export interface ISignInButton {
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

const SignInButton: React.FC<ISignInButton> = ({ primary = false, label }) => {
  const { data: session, status } = useSession()
  return (
    <>
      {status === 'unauthenticated' && (
        <>
          <Tooltip
            title="Log In/Sign Up"
            sx={{
              display: { xxs: 'block', md: 'none' },
            }}
          >
            <IconButton onClick={() => signIn()}>
              <LoginIcon />
            </IconButton>
          </Tooltip>
          <Button
            onClick={() => signIn()}
            sx={{
              gap: 1,
              display: { xxs: 'none', md: 'flex' },
            }}
          >
            <LoginIcon fontSize="small" />
            Log In/Sign Up
          </Button>
        </>
      )}
    </>
  )
}

export default SignInButton
