'use client'

import {
  regexAddressNamePattern,
  regexAddressNumberPattern,
  regexZipCodePattern,
} from '@/utils/regexPatterns'
import { ProfileFormValues } from '@/utils/types/FormValues'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SpringModal from '../../springModal/SpringModal'
import { useParams } from 'next/navigation'

export interface IProfileUpdateForm {
  openModal: boolean
  handleClose: () => void
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ProfileUpdateForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ProfileUpdateForm contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

const ProfileUpdateForm: React.FC<IProfileUpdateForm> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const { data: session, status } = useSession()
  const { locale } = useParams() 

  const handleClickBarcodeReader = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    let stream = null

    try {
      console.log(event)
      stream = await navigator.mediaDevices.getUserMedia({ video: true })
    } catch (error) {
      console.log(error)
    }
  }

  const [address, setAddress] = useState({})

  const {
    watch,
    reset,
    control,
    getFieldState,
    formState: { isValid, isDirty, errors },
    handleSubmit,
  } = useForm<ProfileFormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
      phone: '',
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl,
        address: {
          city: data.city,
          streetName: data.streetName,
          streetNumber: data.streetNumber,
          zipCode: data.zipCode,
        },
        phone: data.phone,
      }

      const response = await fetch('/api/users' + session?.user?.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const responseData = await response.json()
      if (response.ok) {
        console.log('Card created successfully:', responseData)
        // Optionally, you can redirect the user to a success page
        // or show a success message on the form.
      } else {
        console.log('Failed to create card:', responseData)
        // Optionally, you can show an error message on the form.
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error creating card:', error.message)
      } else {
        // If the error is not an instance of Error (unlikely), you can handle it differently
        console.log('Error creating card:', error)
      }
    }
  }

  const handleReset = () => {
    reset()
  }

  const handleCancel = () => {
    handleClose()
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
    <SpringModal
      handleClose={handleClose}
      openModal={openModal}
      label={''}
      keepMounted={true}
    >
      {status === 'authenticated' && (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { maxWidth: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container columnSpacing={1} columns={20}>
            <Grid xs={20} sm={10} md={5}>
              <Controller
                control={control}
                name="city"
                rules={{
                  required: 'City is required',
                  pattern: {
                    value: regexAddressNamePattern,
                    message:
                      'Please enter a valid city name with only Hebrew letters',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl fullWidth required error={!!fieldState.error}>
                    <TextField
                      id={name}
                      inputRef={ref}
                      value={value}
                      label="City"
                      required
                      error={!!fieldState.error}
                      onChange={onChange} // send value to hook form
                      onBlur={onBlur} // notify when input is touched/blur
                    />
                    <FormHelperText>
                      {(function () {
                        if (fieldState.error) {
                          return fieldState.error.message
                        }
                        if (!fieldState.isDirty) {
                          return ''
                        }
                        if (!fieldState.invalid) {
                          return getValidText()
                        }
                      })()}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={20} sm={10} md={6}>
              <Controller
                control={control}
                name="streetName"
                rules={{
                  required: 'Street name is required',
                  pattern: {
                    value: regexAddressNamePattern,
                    message:
                      'Please enter a valid street name with only Hebrew letters',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl fullWidth required error={!!fieldState.error}>
                    <TextField
                      id={name}
                      inputRef={ref}
                      value={value}
                      required
                      label="Street Name"
                      type="text"
                      error={!!fieldState.error}
                      onChange={onChange} // send value to hook form
                      onBlur={onBlur} // notify when input is touched/blur
                    />
                    <FormHelperText>
                      {(function () {
                        if (fieldState.error) {
                          return fieldState.error.message
                        }
                        if (!fieldState.isDirty) {
                          return ''
                        }
                        if (!fieldState.invalid) {
                          return getValidText()
                        }
                      })()}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={20} sm={10} md={4}>
              <Controller
                control={control}
                name="streetNumber"
                rules={{
                  required: 'Street number is required',
                  pattern: {
                    value: regexAddressNumberPattern,
                    message:
                      'Please enter a valid street number with 1-3 digits',
                  },
                  // @ts-ignore
                  valueAsNumber: true,
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl fullWidth required error={!!fieldState.error}>
                    <TextField
                      id={name}
                      inputRef={ref}
                      value={value}
                      required
                      inputProps={{ inputMode: 'numeric' }}
                      label="St. Number"
                      error={!!fieldState.error}
                      onChange={onChange} // send value to hook form
                      onBlur={onBlur} // notify when input is touched/blur
                    />
                    <FormHelperText>
                      {(function () {
                        if (fieldState.error) {
                          return fieldState.error.message
                        }
                        if (!fieldState.isDirty) {
                          return ''
                        }
                        if (!fieldState.invalid) {
                          return getValidText()
                        }
                      })()}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={20} sm={10} md={5}>
              <Controller
                control={control}
                name="zipCode"
                rules={{
                  required: 'Zip code is required',
                  pattern: {
                    value: regexZipCodePattern,
                    message: 'Please enter a valid zip code with 7 digits',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl fullWidth required error={!!fieldState.error}>
                    <TextField
                      id={name}
                      inputRef={ref}
                      required
                      value={value}
                      label="Zip Code"
                      inputProps={{
                        inputMode: 'numeric',
                      }}
                      error={!!fieldState.error}
                      onChange={onChange} // send value to hook form
                      onBlur={onBlur} // notify when input is touched/blur
                    />
                    <FormHelperText>
                      {(function () {
                        if (fieldState.error) {
                          return fieldState.error.message
                        }
                        if (!fieldState.isDirty) {
                          return ''
                        }
                        if (!fieldState.invalid) {
                          return getValidText()
                        }
                      })()}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Tooltip
            followCursor
            title={
              !isValid
                ? 'Please enter all required fields to submit the form'
                : 'Click to submit the form'
            }
          >
            <span>
              <Button
                sx={{
                  p: 2,
                }}
                variant="contained"
                fullWidth
                disabled={!isValid}
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </span>
          </Tooltip>
          <Button
            sx={{
              p: 2,
              m: 'auto',
            }}
            type="reset"
            value="Reset"
            onClick={() => {
              reset()
            }}
          >
            Reset
          </Button>
        </Box>
      )}
    </SpringModal>
  )
}

export default ProfileUpdateForm
