'use client'

import Link from '@/components/mui/Link'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'
import { AiFillApple as AppleIcon } from 'react-icons/ai'
import styles from './Providers.module.scss'

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

const facebookColor = '#4267B2'
const googleColor = '#DB4437'
const appleColor = '#000000'

const Providers: React.FC<IProviders> = ({
  providers,
  providersLoginText,
  primary = false,
  label,
}) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') as string
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  async function handleProviderLogin(provider: any) {
    setLoadingProvider(provider.id)
    console.log('callbackUrl:', callbackUrl)

    try {
      await signIn(provider.id, {
        callbackUrl,
      })
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
              provider.id !== 'credentials' &&
              provider.id !== 'email' && (
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
                    onClick={() => handleProviderLogin(provider)}
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
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '1rem',
        }}
        variant="body2"
      >
        By login to ShareSphere, you agree to our{' '}
        <Link href="/terms-of-use">Terms of Use</Link> and{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </Typography>
    </Box>
  )
}

export default Providers
