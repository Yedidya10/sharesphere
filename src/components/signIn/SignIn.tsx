'use client'

import styles from './SignIn.module.scss'
import { BsFacebook } from 'react-icons/bs' // import Facebook icon
import { AiFillGoogleCircle } from 'react-icons/ai' // import Google icon
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

export interface ISignIn {
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
   * How large should the SignIn be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SignIn contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SignIn: React.FC<ISignIn> = ({
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
      await signIn(provider.id, { callbackUrl: 'http://localhost:3000' })
    } catch (error) {
      console.error('Error Login:', error)
    } finally {
      setLoadingProvider(null)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ul className={styles.ul}>
        {/* Loop through the providers and display a button for each */}
        {providers &&
          Object.values(providers).map((provider: any) => (
            <li className={styles.li} key={provider.name}>
              <button
                className={`${styles.button} ${
                  provider.id === 'google' ? styles.secondary : ''
                }`}
                onClick={() => handleLogin(provider)}
              >
                {loadingProvider === provider.id ? (
                  <LoaderIcon label={''} />
                ) : provider.id === 'facebook' ? (
                  <BsFacebook />
                ) : (
                  <AiFillGoogleCircle />
                )}
                {providersLoginText} {provider.name}
              </button>
            </li>
          ))}
      </ul>
    </>
  )
}

export default SignIn
