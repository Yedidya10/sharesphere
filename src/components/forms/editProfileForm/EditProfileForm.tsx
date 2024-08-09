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

export interface IEditProfileForm {
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
   * How large should the EditProfileForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * EditProfileForm contents
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

const EditProfileForm: React.FC<IEditProfileForm> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const { data: session, status, update } = useSession()
  const { locale } = useParams()

  const handleClickBarcodeReader = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    let stream = null

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true })
    } catch (error) {
      console.error(error)
    }
  }

  const [address, setAddress] = useState({})
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session?.user?.id)
    }
  }, [session?.user?.id])

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
      // for now, we don't want to update the user's name and email because it's coming from google
      firstName: session?.user?.firstName || '',
      lastName: session?.user?.lastName || '',
      email: session?.user?.email || '',
      imageUrl: session?.user?.image || '',
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
      country: 'Israel',
      phone: '',
    },
  })

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      const updatedUser = {
        // firstName: data.firstName,
        // lastName: data.lastName,
        // email: data.email,
        imageUrl: data.imageUrl,
        city: data.city,
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })

      const responseData = await response.json()
      if (response.ok) {
        // Optionally, you can redirect the user to a success page
        // or show a success message on the form.
      } else {
        // Optionally, you can show an error message on the form.
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
            Edit Profile
          </Typography>
          <Grid
            container
            sx={{ mb: 2 }}
            columnSpacing={1}
            rowSpacing={2}
            columns={20}
          >
            <Grid xs={20} sm={10} md={5}>
              <Controller
                control={control}
                name="firstName"
                rules={{
                  required: 'First name is required',
                  pattern: {
                    value:
                      locale === 'he'
                        ? firstAndLastHebrewNamePattern
                        : firstAndLastEnglishNamePattern,
                    message: `Please enter a valid ${
                      locale === 'he' ? 'Hebrew' : 'English'
                    } first name with a minimum of 2 letters`,
                  },
                }}
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
                      label="First Name"
                      disabled
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
            <Grid xs={20} sm={10} md={5}>
              <Controller
                control={control}
                name="lastName"
                rules={{
                  required: 'Last name is required',
                  pattern: {
                    value:
                      locale === 'he'
                        ? firstAndLastHebrewNamePattern
                        : firstAndLastEnglishNamePattern,
                    message: `Please enter a valid ${
                      locale === 'he' ? 'Hebrew' : 'English'
                    } last name with a minimum of 2 letters`,
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl
                    fullWidth
                    disabled
                    // required
                    error={!!fieldState.error}
                  >
                    <TextField
                      id={name}
                      inputRef={ref}
                      value={value}
                      label="Last Name"
                      disabled
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
            <Grid xs={20} sm={10} md={5}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl
                    fullWidth
                    disabled
                    // required
                    error={!!fieldState.error}
                  >
                    <TextField
                      id={name}
                      inputRef={ref}
                      value={value}
                      label="Email"
                      disabled
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
            <Grid xs={20} sm={10} md={5}>
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
            <Grid xs={20} sm={20} md={20} xl={20}>
              <Controller
                control={control}
                name="imageUrl"
                rules={{
                  required: 'Image is required',
                  // need to be fixed because the google image url is not ending with .png or .jpg
                  // pattern: {
                  //   value: regexGoogleProfileImageUrlPattern,
                  //   message: 'Please enter a valid image url',
                  // },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">Image URL</Typography>
                        <em>{'Please enter a valid image url'}</em>
                      </React.Fragment>
                    }
                  >
                    <FormControl fullWidth required error={!!fieldState.error}>
                      <TextField
                        id={name}
                        inputRef={ref}
                        value={value}
                        label="Image URL"
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
                  </HtmlTooltip>
                )}
              />
            </Grid>
            <Grid xs={20} sm={10} md={6}>
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
            <Grid xs={20} sm={10} md={4}>
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

export default EditProfileForm
