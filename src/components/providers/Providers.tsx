'use client'

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { useState } from 'react'
import { AiFillApple as AppleIcon } from 'react-icons/ai'
import styles from './Providers.module.scss'
import { Box } from '@mui/material'

export interface IProviders {
  providersLoginText: string
  providers: any
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the Providers be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Providers contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

interface IProvider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

const facebookColor = '#4267B2'
const googleColor = '#DB4437'
const appleColor = '#000000'

const Providers: React.FC<IProviders> = ({
  providers,
  providersLoginText,
  primary = false,
  label,
  ...props
}) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  async function handleLogin(provider: any) {
    setLoadingProvider(provider.id)

    try {
      await signIn(provider.id, {})
    } catch (error) {
      console.error('Error Login:', error)
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <Box>
    <List
      sx={{
        minWidth: '400px',
        width: '100%',
      }}
      
    >
      {/* Loop through the providers and display a button for each */}
      {providers &&
        Object.values(providers).map(
          (provider: any) =>
            provider.id !== 'credentials' && (
              <ListItem key={provider.name} disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                    borderRadius: '5px',
                    border:
                      provider.id === 'facebook'
                        ? `1px solid ${facebookColor}`
                        : provider.id === 'google'
                        ? `1px solid ${googleColor}`
                        : provider.id === 'apple'
                        ? `1px solid ${appleColor}`
                        : '1px solid #000000',
                  }}
                  className={styles.providerButton}
                  onClick={() => handleLogin(provider)}
                >
                  {loadingProvider === provider.id ? (
                    <CircularProgress
                      sx={{
                        color:
                          provider.id === 'facebook'
                            ? facebookColor
                            : provider.id === 'google'
                            ? googleColor
                            : provider.id === 'apple'
                            ? appleColor
                            : '#000000',
                      }}
                      size={24}
                    />
                  ) : provider.id === 'facebook' ? (
                    <FacebookOutlinedIcon sx={{ color: facebookColor }} />
                  ) : provider.id === 'google' ? (
                    <GoogleIcon sx={{ color: googleColor }} />
                  ) : provider.id === 'apple' ? (
                    <AppleIcon color={appleColor} size={24} />
                  ) : null}
                  <ListItemText
                    sx={{
                      color: 'text.primary',
                    }}
                    primary={providersLoginText + ' ' + provider.name}
                  />
                </ListItemButton>
              </ListItem>
            )
        )}
    </List>
    </Box>
  )
}

export default Providers
