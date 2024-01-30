'use client'

import {
  regexAddressNamePattern,
  regexAddressNumberPattern,
  regexZipCodePattern,
} from '@/utils/regexPatterns'
import { AddItemFormValues } from '@/utils/types/FormValues'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Control, Controller, UseFormWatch } from 'react-hook-form'

export interface ILocationInput {
  control: Control<AddItemFormValues, any>
  watch: UseFormWatch<AddItemFormValues>
  setValue: (
    name: keyof AddItemFormValues,
    value: any,
    options?: Partial<{
      shouldValidate: boolean
      shouldDirty: boolean
    }>
  ) => void
  userAddress?: {
    city: string
    streetName: string
    streetNumber: string
    zipCode?: string
  }
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the LocationInput be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * LocationInput contents
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
    fontSize: theme.typography.pxToRem(13),
    border: '1px solid #dadde9',
  },
}))

type TUserLocation = {
  coordinates?: {
    lat: number
    lng: number
  }
  address?: {
    city: string
    streetName: string
    streetNumber: string
    zipCode?: string
  }
}

const LocationInput: React.FC<ILocationInput> = ({
  primary = false,
  label,
  control,
  setValue,
  watch,
  userAddress,
}) => {
  const [userLocation, setUserLocation] = React.useState<
    TUserLocation | undefined
  >(undefined)
  const [userLocationChecked, setUserLocationChecked] = React.useState(false)
  const [userAddressChecked, setUserAddressChecked] = React.useState(false)

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }

  const resetValues = () => {
    setValue('city', '', { shouldDirty: false })
    setValue('streetName', '', { shouldDirty: false })
    setValue('streetNumber', '', { shouldDirty: false })
    setValue('zipCode', '', { shouldDirty: false })
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
    <>
      {watch('mainCategory') && (
        <Box
          sx={{
            paddingBlockStart: 4,
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 500,
            }}
          >
            {`${(watch('mainCategory') as string)
              .split(' ')
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(' ')} Location:`}
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography
                    color="inherit"
                    sx={{
                      fontSize: '.8rem',
                    }}
                  >
                    What is the reason for requesting this information?
                  </Typography>
                  {`We require the full address to calculate the distance
          between the ${watch('mainCategory')}'s location and the borrower. Rest
          assured, the full address will not be made public, and it
          will only be shared with the borrower after your
          approval.`}
                </React.Fragment>
              }
            >
              <InfoOutlinedIcon
                sx={{
                  fontSize: '20px',
                }}
              />
            </HtmlTooltip>
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={userAddressChecked} />}
            onChange={(event: React.SyntheticEvent, checked: boolean) => {
              if (checked) {
                if (userLocationChecked) {
                  setUserLocationChecked(false)
                  resetValues()
                }
                setUserAddressChecked(true)

                setValue('city', userAddress?.city)
                setValue('streetName', userAddress?.streetName)
                setValue('streetNumber', userAddress?.streetNumber)
                setValue('zipCode', userAddress?.zipCode)
              } else {
                setUserAddressChecked(false)
                resetValues()
              }
            }}
            label="Use my main address"
          />
          <FormControlLabel
            control={<Checkbox checked={userLocationChecked} />}
            label="Use my current location"
            onChange={async (event: React.SyntheticEvent, checked: boolean) => {
              if (checked) {
                if (userAddressChecked) {
                  setUserAddressChecked(false)
                  resetValues()
                }
                setUserLocationChecked(true)

                if (!userLocation?.coordinates) {
                  getCurrentLocation()
                }
                if (userLocation?.coordinates) {
                  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.coordinates?.lat},${userLocation.coordinates?.lng}&result_type=street_address&key=${mapApiKey}`

                  try {
                    const response = await fetch(url, {
                      method: 'GET',
                    })

                    const geocode = await response.json()
                    if (response.ok) {
                      console.log('Found street address:', geocode)
                      setUserLocation({
                        ...userLocation,
                        address: {
                          city: geocode.results[0].address_components[2]
                            .long_name,
                          streetName:
                            geocode.results[0].address_components[1].long_name.substring(
                              geocode.results[0].address_components[1].long_name.indexOf(
                                ' '
                              ) + 1
                            ),
                          streetNumber:
                            geocode.results[0].address_components[0].long_name,
                        },
                      })
                    } else {
                      console.log('No street address found:', geocode)
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      console.log('Error updating user:', error.message)
                    } else {
                      // If the error is not an instance of Error (unlikely), you can handle it differently
                      console.log('Error updating user:', error)
                    }
                  }
                }

                if (userLocation?.address) {
                  setValue('city', userLocation.address?.city, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                  setValue('streetName', userLocation.address?.streetName, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                  setValue('streetNumber', userLocation.address?.streetNumber, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              } else {
                setUserLocationChecked(false)
                resetValues()
              }
            }}
          />
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
                  // valueAsNumber: true,
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
                  required: false,
                  pattern: {
                    value: regexZipCodePattern,
                    message: 'Please enter a valid zip code with 7 digits',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <TextField
                      id={name}
                      inputRef={ref}
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
        </Box>
      )}
    </>
  )
}

export default LocationInput
