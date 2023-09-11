'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import MuiSnackbar from '../../muiSnackbar/MuiSnackbar'

interface State extends SnackbarOrigin {
  open: boolean
}

export interface IMagicLinkForm {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the MagicLinkForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * MagicLinkForm contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

interface ILoginFormDeta {
  email: string
}

const MagicLinkForm: React.FC<IMagicLinkForm> = ({
  primary = false,
  label,
  ...props
}) => {
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

  const {
    formState: { isValid, isDirty, errors },
    handleSubmit,
    control,
  } = useForm<ILoginFormDeta>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ILoginFormDeta> = async (data) => {
    try {
      await signIn('email', {
        email: data.email,
      })

      // if (res?.error) {
      //   return handleOpenUserNotExistSnackbar({
      //     vertical: 'top',
      //     horizontal: 'center',
      //   })
      // }

      // if (res?.ok) {
      //   handleOpenLoginSuccessfullySnackbar({
      //     vertical: 'top',
      //     horizontal: 'center',
      //   })
      // }
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <Button
          type="submit"
          fullWidth
          disabled={!isDirty || !isValid}
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Sign In with Email
        </Button>
      </Box>
      <MuiSnackbar
        message="Email sent successfully, please check your inbox"
        severity="success"
        state={loginSuccessfullySnackbarState}
        handleClose={handleCloseLoginSuccessfullySnackbar}
      />
      <MuiSnackbar
        message="A error occurred, please try again or contact support"
        severity="error"
        state={userNotExistSnackbarState}
        handleClose={handleCloseUserNotExistSnackbar}
      />
    </Box>
  )
}

export default MagicLinkForm
