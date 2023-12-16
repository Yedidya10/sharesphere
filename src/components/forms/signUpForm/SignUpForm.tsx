'use client'

import Link from '@/components/mui/Link'
import  Visibility from '@mui/icons-material/Visibility'
import  VisibilityOff from '@mui/icons-material/VisibilityOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export interface ISignUpForm {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SignUpForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SignUpForm contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignUpForm: React.FC<ISignUpForm> = () => {
  const [showPassword, setShowPassword] = React.useState(false)

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
  } = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      const firstName =
        data.firstName.charAt(0).toUpperCase() +
        data.firstName.slice(1).toLowerCase()
      const lastName =
        data.lastName.charAt(0).toUpperCase() +
        data.lastName.slice(1).toLowerCase()

      const userData = {
        firstName,
        lastName,
        email: data.email,
        password: data.password,
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const results = await response.json()

      if (results.error === 'User already exists') {
        console.log('User already exists')
      }
    } catch (error: any) {
      console.log(error.message)
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
        maxWidth: '100%',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          color: 'text.primary',
        }}
      >
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'First name is required',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'First name must be letters only',
                },
                validate: {
                  minLength: (value) =>
                    value.length >= 2 || 'Must be at least 2 characters',
                  maxLength: (value) =>
                    value.length <= 20 || 'Must be less than 20 characters',
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
                    autoComplete="given-name"
                    required
                    fullWidth
                    id={name}
                    inputRef={ref}
                    name={name}
                    label="First Name"
                    autoFocus
                    value={value}
                    placeholder="John"
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
                      if (!fieldState.isDirty) {
                        return ''
                      }
                    })()}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Last name is required',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Last name must be letters only',
                },
                validate: {
                  minLength: (value) =>
                    value.length >= 2 || 'Must be at least 2 characters',
                  maxLength: (value) =>
                    value.length <= 20 || 'Must be less than 20 characters',
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
                    autoComplete="family-name"
                    required
                    fullWidth
                    id={name}
                    inputRef={ref}
                    label="Last Name"
                    name={name}
                    value={value}
                    placeholder="Doe"
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
                      if (!fieldState.isDirty) {
                        return ''
                      }
                    })()}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email is invalid',
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
                    fullWidth
                    inputRef={ref}
                    value={value}
                    id={name}
                    label="Email Address"
                    name={name}
                    autoComplete="email"
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="john.doe@email.com"
                  />
                  <FormHelperText>
                    {(function () {
                      if (fieldState.error) {
                        return fieldState.error.message
                      }
                      if (!fieldState.invalid && fieldState.isDirty) {
                        return getValidText()
                      }
                      if (!fieldState.isDirty) {
                        return ''
                      }
                    })()}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                validate: {
                  minLength: (value) =>
                    value.length >= 6 || 'Must be at least 6 characters',
                  maxLength: (value) =>
                    value.length <= 20 || 'Must be less than 20 characters',
                  pattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/i.test(
                      value
                    ) ||
                    'Must contain at least one number, one uppercase and lowercase letter',
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState,
              }) => (
                <FormControl
                  fullWidth
                  required
                  error={!!fieldState.error}
                  margin="dense"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id={name}
                    name={name}
                    autoComplete="new-password"
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
                    inputRef={ref}
                    required
                    value={value}
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
                      if (!fieldState.isDirty) {
                        return ''
                      }
                    })()}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{
                color: 'text.primary',
              }}
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Tooltip title={isValid ? '' : 'Please fill out all required fields'}>
          <span>
            <Button
              type="submit"
              fullWidth
              disabled={!isValid || !isDirty}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </span>
        </Tooltip>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/auth/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SignUpForm
