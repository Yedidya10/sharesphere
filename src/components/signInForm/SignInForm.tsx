'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@/components/mui/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import MuiSnackbar from '../muiSnackbar/MuiSnackbar'
import { SnackbarOrigin } from '@mui/material/Snackbar'

interface State extends SnackbarOrigin {
  open: boolean
}

export interface ISignInForm {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SignInForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SignInForm contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

interface ILoginFormDeta {
  email: string
  password: string
}

const facebookColor = '#4267B2'
const googleColor = '#DB4437'
const appleColor = '#000000'

const SignInForm: React.FC<ISignInForm> = ({
  primary = false,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [userExist, setUserExist] = React.useState<boolean | null>(null)

  const [loginSuccessfullySnackbarState, setLoginSuccessfullySnackbarState] =
    React.useState<State>({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    })

  const [userNotExistSnackbarState, setUserNotExistSnackbarState] =
    React.useState<State>({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    })

  const handleOpenUserNotExistSnackbar = (newState: SnackbarOrigin) => {
    setUserNotExistSnackbarState({ open: true, ...newState })
  }

  const handleOpenLoginSuccessfullySnackbar = (newState: SnackbarOrigin) => {
    setLoginSuccessfullySnackbarState({ open: true, ...newState })
  }

  const handleCloseUserNotExistSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setUserNotExistSnackbarState({
      ...userNotExistSnackbarState,
      open: false,
    })
  }

  const handleCloseLoginSuccessfullySnackbar = () => {
    setLoginSuccessfullySnackbarState({
      ...loginSuccessfullySnackbarState,
      open: false,
    })
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const {
    formState: { isValid, isDirty, errors },
    handleSubmit,
    control,
  } = useForm<ILoginFormDeta>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ILoginFormDeta> = async (data) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      console.log('res:', res?.error)

      if (res?.error) {
        if (res.error === 'No user found with this email') {
          setUserExist(false)
          return handleOpenUserNotExistSnackbar({
            vertical: 'top',
            horizontal: 'center',
          })
        }
      }

      if (res?.ok) {
        setUserExist(true)
        handleOpenLoginSuccessfullySnackbar({
          vertical: 'top',
          horizontal: 'center',
        })
      }
    } catch (error) {
      console.error('Error Login:', error)
    }
  }

  const getValidText = () => {
    return (
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'green',
          fontSize: '0.75rem',
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: '0.75rem',
          }}
        />
        Looks good!
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState,
          }) => (
            <FormControl
              margin="dense"
              fullWidth
              required
              error={!!fieldState.error}
            >
              <TextField
                required
                id={name}
                label="Email Address"
                name={name}
                autoComplete={name}
                autoFocus
                value={value}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
              />
              <FormHelperText>
                {(function () {
                  if (fieldState.error) {
                    return fieldState.error.message
                  }
                  if (!fieldState.invalid && fieldState.isDirty) {
                    return getValidText()
                  }
                })()}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState,
          }) => (
            <FormControl
              margin="dense"
              fullWidth
              required
              error={!!fieldState.error}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id={name}
                name={name}
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={value}
                inputRef={ref}
                required
                onChange={onChange}
                onBlur={onBlur}
              />
              <FormHelperText>
                {(function () {
                  if (fieldState.error) {
                    return fieldState.error.message
                  }
                  if (!fieldState.invalid && fieldState.isDirty) {
                    return getValidText()
                  }
                })()}
              </FormHelperText>
            </FormControl>
          )}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{
            color: 'text.primary',
          }}
        />
        <Button
          type="submit"
          fullWidth
          disabled={!isDirty || !isValid}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid>
            <Link href="/auth/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <MuiSnackbar
        message="You have successfully logged in"
        severity="success"
        state={loginSuccessfullySnackbarState}
        handleClose={handleCloseLoginSuccessfullySnackbar}
      />
      <MuiSnackbar
        message="User does not exist"
        severity="warning"
        state={userNotExistSnackbarState}
        handleClose={handleCloseUserNotExistSnackbar}
      />
    </Box>
  )
}

export default SignInForm
