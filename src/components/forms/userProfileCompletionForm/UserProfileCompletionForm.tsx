'use client'

import {
  firstAndLastEnglishNamePattern,
  firstAndLastHebrewNamePattern,
  regexAddressNamePattern,
  regexAddressNumberPattern,
  regexSevenZipCodePattern,
} from '@/utils/regexPatterns'
import { EditProfileFormValues } from '@/utils/types/formValues'
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
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SpringModal from '../../springModal/SpringModal'

export interface IUserProfileCompletionForm {
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
   * How large should the UserProfileCompletionForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * UserProfileCompletionForm contents
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

const UserProfileCompletionForm: React.FC<IUserProfileCompletionForm> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const { data: session, status } = useSession()
  const { locale } = useParams()

  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (session?.user) {
      setUserId(session.user.id)
    }
  }, [session])

  const {
    watch,
    reset,
    control,
    getFieldState,
    formState: { isValid, isDirty, errors },
    handleSubmit,
  } = useForm<EditProfileFormValues>({
    mode: 'onChange',
    defaultValues: {
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
      country: 'Israel', // TODO: add country to the user's address
      phone: '',
    },
  })

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      const updatedUser = {
        city: data.city,
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
      }

      console.log(`URL:, ${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }
      )

      if (response.ok) {
        // Optionally, you can redirect the user to a success page
        // or show a success message on the form.
        const data = await response.json()
      } else {
        // Optionally, you can show an error message on the form.
        const error = await response.json()
        console.error('Error updating user:', error)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating user:', error.message)
      } else {
        // If the error is not an instance of Error (unlikely), you can handle it differently
        console.error('Error updating user:', error)
      }
    } finally {
      handleClose()
      reset()
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
          <Typography
            component={'h1'}
            variant={'h4'}
            sx={{
              fontWeight: 'bold',
              color: 'primary.text',
              mb: 4,
            }}
          >
            Complete your profile
          </Typography>
          <Typography
            sx={{
              color: 'primary.text',
              mb: 2,
            }}
          >
            Hello {session?.user?.firstName}, please fill in your address to
            continue
          </Typography>
          <Grid
            container
            sx={{ mb: 2 }}
            columnSpacing={1}
            rowSpacing={2}
            columns={100}
          >
            <Grid xs={100} sm={50} md={25}>
              <Controller
                control={control}
                name="phone"
                // rules={{
                //   required: 'Phone is required',
                //   pattern: {
                //     value: /^[0-9]{10}$/i,
                //     message: 'Please enter a valid phone number',
                //   },
                // }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl
                    fullWidth
                    // required
                    error={!!fieldState.error}
                  >
                    <TextField
                      id={name}
                      inputRef={ref}
                      value={value}
                      label="Phone"
                      // required
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
            <Grid xs={100} sm={50} md={20}>
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
                  <FormControl
                    sx={{ m: 0, p: 0 }}
                    fullWidth
                    required
                    error={!!fieldState.error}
                  >
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
            <Grid xs={100} sm={50} md={25}>
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
                  <FormControl
                    sx={{ m: 0, p: 0 }}
                    fullWidth
                    required
                    error={!!fieldState.error}
                  >
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
            <Grid xs={100} sm={50} md={15}>
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
                  <FormControl
                    sx={{ m: 0, p: 0 }}
                    fullWidth
                    required
                    error={!!fieldState.error}
                  >
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
            <Grid xs={100} sm={50} md={15}>
              <Controller
                control={control}
                name="zipCode"
                rules={{
                  required: 'Zip code is required',
                  pattern: {
                    value: regexSevenZipCodePattern,
                    message: 'Please enter a valid zip code with 7 digits',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl
                    sx={{ m: 0, p: 0 }}
                    fullWidth
                    required
                    error={!!fieldState.error}
                  >
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
            <Grid xs={100} sm={50} md={100}>
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
                    fullWidth
                    variant="contained"
                    disabled={!isValid || !isDirty}
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </Button>
                </span>
              </Tooltip>
            </Grid>
            <Grid xs={100} sm={50} md={70}>
              <Tooltip
                followCursor
                title={'Click to close the form'}
                placement="right"
              >
                <span>
                  <Button
                    size="small"
                    sx={{
                      p: 1,
                    }}
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      handleClose()
                      reset()
                    }}
                  >
                    I&apos;ll do it later
                  </Button>
                </span>
              </Tooltip>
            </Grid>
            <Grid xs={100} sm={50} md={30}>
              <Button
                size="small"
                sx={{
                  p: 1,
                  m: 'auto',
                }}
                fullWidth
                type="reset"
                value="Reset"
                onClick={() => {
                  reset()
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </SpringModal>
  )
}

export default UserProfileCompletionForm
