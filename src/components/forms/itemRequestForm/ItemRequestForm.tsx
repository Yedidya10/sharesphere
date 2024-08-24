'use client'

import IMuiSnackbar from '@/components/muiSnackbar/MuiSnackbar'
import { ItemRequestFormValues } from '@/utils/types/formValues'
import { Request } from '@/utils/types/request'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { addDays, differenceInDays, isSameDay } from 'date-fns'
import en from 'date-fns/locale/en-US'
import he from 'date-fns/locale/he'
import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface IItemRequestForm {
  open: boolean
  maxLoanPeriod: number
  requests: Request[]
  cardId: string
  handleRequestFormClose: () => void
  setIsUserAlreadyRequest: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemRequestForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemRequestForm contents
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

function calculateMaxDate(pickupDate: Date, maxLoanPeriod: number): Date {
  // Create a copy of the start date object to avoid mutating the original
  const maxDate = addDays(pickupDate, maxLoanPeriod)
  return maxDate
}

const calculateMinDate = (pickupDate: Date, minDays: number): Date => {
  // Create a copy of the start date object to avoid mutating the original
  const newDate = new Date(pickupDate)
  // Add the minimum number of days to the start date
  newDate.setDate(newDate.getDate() + minDays)
  // Return the new date object
  return newDate
}

const ItemRequestForm: React.FC<IItemRequestForm> = ({
  primary = false,
  label,
  maxLoanPeriod,
  requests,
  handleRequestFormClose,
  setIsUserAlreadyRequest,
  cardId,
  open,
}) => {
  const { data: session, status } = useSession()
  const locale = useLocale()
  const [isSubmitSuccess, setIsSubmitSuccess] = React.useState<boolean | null>(
    null
  )
  const disabledDates = React.useMemo(() => {
    const dates = requests.map((request) => {
      const { pickupDate, returnDate } = request.dates || {}
      const status = request.status?.value

      if (status === 'rejected' || status === 'removed' || status === 'pending')
        return []

      const start = new Date(pickupDate)
      const end = new Date(returnDate)
      const dates = []
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date))
      }
      return dates
    })
    return dates.flat()
  }, [requests])

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue)
  // }

  // const [returnDateError, setEndDateError] =
  //   React.useState<DateValidationError | null>(null)
  // const [pickupDateError, setStartDateError] =
  //   React.useState<DateValidationError | null>(null)

  // const pickupDateErrorMessage = React.useMemo(() => {
  //   switch (pickupDateError) {
  //     case 'maxDate':
  //     case 'minDate': {
  //       return 'Please select a date in the first quarter of 2022'
  //     }

  //     case 'invalidDate': {
  //       return 'Your date is not valid'
  //     }

  //     default: {
  //       return ''
  //     }
  //   }
  // }, [pickupDateError])

  // const returnDateErrorMessage = React.useMemo(() => {
  //   switch (returnDateError) {
  //     case 'maxDate':
  //     case 'minDate': {
  //       return 'Please select a date in the first quarter of 2022'
  //     }

  //     case 'invalidDate': {
  //       return 'Your date is not valid'
  //     }

  //     default: {
  //       return ''
  //     }
  //   }
  // }, [returnDateError])

  const {
    watch,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ItemRequestFormValues>({
    defaultValues: {
      pickupDate: '',
      returnDate: '',
      message: '',
    },
  })

  const onSubmit = async (data: ItemRequestFormValues) => {
    try {
      const pickupDate = new Date(data.pickupDate)
      const returnDate = new Date(data.returnDate)

      const request = {
        itemId: cardId,
        borrowerId: session?.user?.id,
        dates: {
          pickupDate,
          returnDate,
          borrowingPeriod: differenceInDays(returnDate, pickupDate),
        },
        status: {
          value: 'pending',
        },
        messages: {
          borrowerMessage: data.message,
          lenderMessage: '',
        },
      }

      const res = await fetch(`/api/requests/${cardId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!res.ok) {
        setIsSubmitSuccess(false)
        throw new Error('Error submitting request')
      }

      setIsSubmitSuccess(true)
      setIsUserAlreadyRequest(true)
    } catch (error) {
      console.error(error)
    } finally {
      reset()
      handleRequestFormClose()
    }
  }

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={locale === 'he' ? he : en}
      >
        {open && status === 'authenticated' && (
          <>
            <Divider />
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { maxWidth: '100%' },
                // border: '1px solid rgba(0, 0, 0, 0.12)',
                // borderRadius: '5px',
                // p: 2,
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box>
                <Typography>Request an item</Typography>
                <Grid
                  container
                  columnSpacing={1}
                  columns={{ xs: 100, sm: 100, md: 100 }}
                  sx={{
                    paddingBlockStart: 1,
                  }}
                >
                  <Grid xs={100} sm={100}>
                    <Typography>
                      Please select the dates you would like to borrow the item
                    </Typography>
                    {/* <Typography>
                    Please choose a fixed dates or a flexible date range
                  </Typography> */}
                  </Grid>

                  {/* <TabContext value={value}> */}
                  {/* <Controller
                    name="requestType"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TabContext value={value}>
                          <TabList
                            onChange={handleChange}
                            aria-label="request type"
                          >
                            <Tab
                              label="Fixed Dates"
                              defaultChecked
                              value="fixedDates"
                            />
                            <Tab
                              label="Flexible Dates"
                              value="flexibleDates"
                              hidden={true}
                              disabled={true}
                            />
                          </TabList>
                          <TabPanel
                            value="flexibleDates"
                            sx={{
                              width: '100%',
                              paddingInline: 0.5,
                              paddingBlockEnd: 0,
                            }}
                            defaultChecked
                          >
                            <Grid
                              container
                              columnSpacing={1}
                              columns={{ xs: 100, sm: 100, md: 100 }}
                            >
                              <Grid xs={100} sm={50}>
                                <Controller
                                  name="startDate"
                                  control={control}
                                  rules={{
                                    required: 'Please enter a start date',
                                    validate: {
                                      validator: (value) => {
                                        const returnDate = watch('endDate')
                                        if (returnDate) {
                                          const days = differenceInDays(
                                            new Date(endDate),
                                            new Date(value)
                                          )
                                          return (
                                            days >= 30 ||
                                            'Pick up date is too close to return date. Minimum 30 days'
                                          )
                                        }
                                      },
                                    },
                                  }}
                                  render={({
                                    field: { value, ref, name, ...rest },
                                    fieldState,
                                  }) => {
                                    return (
                                      <FormControl
                                        fullWidth
                                        required
                                        error={!!fieldState.error}
                                      >
                                        <DatePicker
                                          ref={ref}
                                          inputRef={ref}
                                          label="Start date"
                                          disablePast
                                          shouldDisableDate={(day) => {
                                            return disabledDates.some((date) =>
                                              isSameDay(date, new Date(day))
                                            )
                                          }}
                                          maxDate={watch('returnDate')}
                                          value={value || null}
                                          slotProps={{
                                            textField: {
                                              required: true,
                                              name: name,
                                              ref: ref,
                                              inputRef: ref,
                                              helperText: `${
                                                fieldState.error
                                                  ? fieldState.error.message
                                                  : ' '
                                              }`,
                                              fullWidth: true,
                                            },
                                          }}
                                          {...rest}
                                        />
                                        <FormHelperText>
                                          {(function () {
                                            if (fieldState.error) {
                                              return 'Minimum 3 days'
                                            }
                                            if (!fieldState.invalid) {
                                              return 'Please select a pick up date'
                                            }
                                            return ' '
                                          })()}
                                        </FormHelperText>
                                      </FormControl>
                                    )
                                  }}
                                />
                              </Grid>
                              <Grid xs={100} sm={50}>
                                <Controller
                                  name="endDate"
                                  control={control}
                                  rules={{
                                    required: 'Please enter a return date',
                                    validate: (value) => {
                                      const pickupDate = watch('startDate')
                                      if (pickupDate) {
                                        const days = differenceInDays(
                                          new Date(value),
                                          new Date(startDate)
                                        )
                                        return (
                                          days <= maxLoanPeriod ||
                                          `Maximum loan period is ${maxLoanPeriod} days`
                                        )
                                      }
                                    },
                                  }}
                                  render={({
                                    field: { value, ref, name, ...rest },
                                    fieldState,
                                  }) => {
                                    return (
                                      <FormControl
                                        fullWidth
                                        required
                                        error={!fieldState.error}
                                      >
                                        <DatePicker
                                          label="End date"
                                          disablePast
                                          minDate={calculateMinDate(
                                            new Date(watch('pickupDate')),
                                            3
                                          )}
                                          shouldDisableDate={(day) => {
                                            return disabledDates.some((date) =>
                                              isSameDay(date, new Date(day))
                                            )
                                          }}
                                          maxDate={calculateMaxDate(
                                            new Date(watch('pickupDate')),
                                            maxLoanPeriod
                                          )}
                                          value={value || null}
                                          slotProps={{
                                            textField: {
                                              required: true,
                                              name: name,
                                              ref: ref,
                                              inputRef: ref,
                                              helperText: `${
                                                fieldState.error
                                                  ? fieldState.error.message
                                                  : ' '
                                              }`,
                                              fullWidth: true,
                                            },
                                          }}
                                          {...rest}
                                        />
                                        <FormHelperText>
                                          {(function () {
                                            if (fieldState.error) {
                                              return `Please select at least 3 days`
                                            }
                                            if (!fieldState.invalid) {
                                              return 'Please select a return date'
                                            }
                                            return ' '
                                          })()}
                                        </FormHelperText>
                                      </FormControl>
                                    )
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </TabPanel>
                          <TabPanel
                            value="fixedDates"
                            sx={{
                              width: '100%',
                              paddingInline: 0.5,
                              paddingBlockEnd: 0,
                            }}
                          >
                            <Grid
                              container
                              columnSpacing={1}
                              columns={{ xs: 100, sm: 100, md: 100 }}
                            >
                              <Grid xs={100} sm={50}>
                                <Controller
                                  name="pickupDate"
                                  control={control}
                                  rules={{
                                    required: 'Please enter a pick up date',
                                    validate: {
                                      validator: (value) => {
                                        const returnDate = watch('returnDate')
                                        if (returnDate) {
                                          const days = differenceInDays(
                                            new Date(returnDate),
                                            new Date(value)
                                          )
                                          return (
                                            days >= 3 ||
                                            'Pick up date is too close to return date. Minimum 3 days'
                                          )
                                        }
                                      },
                                    },
                                  }}
                                  render={({
                                    field: { value, ref, name, ...rest },
                                    fieldState,
                                  }) => {
                                    return (
                                      <FormControl
                                        fullWidth
                                        required
                                        error={!!fieldState.error}
                                      >
                                        <DatePicker
                                          ref={ref}
                                          inputRef={ref}
                                          label="Pick up date"
                                          disablePast
                                          shouldDisableDate={(day) => {
                                            return disabledDates.some((date) =>
                                              isSameDay(date, new Date(day))
                                            )
                                          }}
                                          maxDate={watch('returnDate')}
                                          value={value || null}
                                          slotProps={{
                                            textField: {
                                              required: true,
                                              name: name,
                                              ref: ref,
                                              inputRef: ref,
                                              helperText: `${
                                                fieldState.error
                                                  ? fieldState.error.message
                                                  : ' '
                                              }`,
                                              fullWidth: true,
                                            },
                                          }}
                                          {...rest}
                                        />
                                        <FormHelperText>
                                          {(function () {
                                            if (fieldState.error) {
                                              return 'Minimum 3 days'
                                            }
                                            if (!fieldState.invalid) {
                                              return 'Please select a pick up date'
                                            }
                                            return ' '
                                          })()}
                                        </FormHelperText>
                                      </FormControl>
                                    )
                                  }}
                                />
                              </Grid>
                              <Grid xs={100} sm={50}>
                                <Controller
                                  name="returnDate"
                                  control={control}
                                  rules={{
                                    required: 'Please enter a return date',
                                    validate: (value) => {
                                      const pickupDate = watch('pickupDate')
                                      if (pickupDate) {
                                        const days = differenceInDays(
                                          new Date(value),
                                          new Date(pickupDate)
                                        )
                                        return (
                                          days <= maxLoanPeriod ||
                                          `Maximum loan period is ${maxLoanPeriod} days`
                                        )
                                      }
                                    },
                                  }}
                                  render={({
                                    field: { value, ref, name, ...rest },
                                    fieldState,
                                  }) => {
                                    return (
                                      <FormControl
                                        fullWidth
                                        required
                                        error={!fieldState.error}
                                      >
                                        <DatePicker
                                          label="Return date"
                                          disablePast
                                          minDate={calculateMinDate(
                                            new Date(watch('pickupDate')),
                                            3
                                          )}
                                          shouldDisableDate={(day) => {
                                            return disabledDates.some((date) =>
                                              isSameDay(date, new Date(day))
                                            )
                                          }}
                                          maxDate={calculateMaxDate(
                                            new Date(watch('pickupDate')),
                                            maxLoanPeriod
                                          )}
                                          value={value || null}
                                          slotProps={{
                                            textField: {
                                              required: true,
                                              name: name,
                                              ref: ref,
                                              inputRef: ref,
                                              helperText: `${
                                                fieldState.error
                                                  ? fieldState.error.message
                                                  : ' '
                                              }`,
                                              fullWidth: true,
                                            },
                                          }}
                                          {...rest}
                                        />
                                        <FormHelperText>
                                          {(function () {
                                            if (fieldState.error) {
                                              return `Please select at least 3 days`
                                            }
                                            if (!fieldState.invalid) {
                                              return 'Please select a return date'
                                            }
                                            return ' '
                                          })()}
                                        </FormHelperText>
                                      </FormControl>
                                    )
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </TabPanel>
                        </TabContext>
                      )
                    }}
                  /> */}
                  {/* </TabContext> */}
                  <Grid xs={100} sm={50}>
                    <Controller
                      name="pickupDate"
                      control={control}
                      rules={{
                        required: 'Please enter a pick up date',
                        validate: {
                          validator: (value) => {
                            const returnDate = watch('returnDate')
                            if (returnDate) {
                              const days = differenceInDays(
                                new Date(returnDate),
                                new Date(value)
                              )
                              return (
                                days >= 3 ||
                                'Pick up date is too close to return date. Minimum 3 days'
                              )
                            }
                          },
                        },
                      }}
                      render={({
                        field: { value, ref, name, ...rest },
                        fieldState,
                      }) => {
                        return (
                          <FormControl
                            fullWidth
                            required
                            error={!!fieldState.error}
                          >
                            <DatePicker
                              ref={ref}
                              inputRef={ref}
                              label="Pick up date"
                              disablePast
                              shouldDisableDate={(day) => {
                                return disabledDates.some((date) =>
                                  isSameDay(date, new Date(day))
                                )
                              }}
                              maxDate={watch('returnDate')}
                              value={value || null}
                              slotProps={{
                                textField: {
                                  required: true,
                                  name: name,
                                  ref: ref,
                                  inputRef: ref,
                                  helperText: `${
                                    fieldState.error
                                      ? fieldState.error.message
                                      : ' '
                                  }`,
                                  fullWidth: true,
                                },
                              }}
                              {...rest}
                            />
                            <FormHelperText>
                              {(function () {
                                if (fieldState.error) {
                                  return 'Minimum 3 days'
                                }
                                if (!fieldState.invalid) {
                                  return 'Please select a pick up date'
                                }
                                return ' '
                              })()}
                            </FormHelperText>
                          </FormControl>
                        )
                      }}
                    />
                  </Grid>
                  <Grid xs={100} sm={50}>
                    <Controller
                      name="returnDate"
                      control={control}
                      rules={{
                        required: 'Please enter a return date',
                        validate: (value) => {
                          const pickupDate = watch('pickupDate')
                          if (pickupDate) {
                            const days = differenceInDays(
                              new Date(value),
                              new Date(pickupDate)
                            )
                            return (
                              days <= maxLoanPeriod ||
                              `Maximum loan period is ${maxLoanPeriod} days`
                            )
                          }
                        },
                      }}
                      render={({
                        field: { value, ref, name, ...rest },
                        fieldState,
                      }) => {
                        return (
                          <FormControl
                            fullWidth
                            required
                            error={!fieldState.error}
                            disabled={watch('pickupDate') === ''}
                          >
                            <DatePicker
                              label="Return date"
                              disablePast
                              disabled={watch('pickupDate') === ''}
                              minDate={calculateMinDate(
                                new Date(watch('pickupDate')),
                                3
                              )}
                              shouldDisableDate={(day) => {
                                return disabledDates.some((date) =>
                                  isSameDay(date, new Date(day))
                                )
                              }}
                              maxDate={calculateMaxDate(
                                new Date(watch('pickupDate')),
                                maxLoanPeriod
                              )}
                              value={value || null}
                              slotProps={{
                                textField: {
                                  required: true,
                                  name: name,
                                  ref: ref,
                                  inputRef: ref,
                                  helperText: `${
                                    fieldState.error
                                      ? fieldState.error.message
                                      : ' '
                                  }`,
                                  fullWidth: true,
                                },
                              }}
                              {...rest}
                            />
                            <FormHelperText>
                              {(function () {
                                if (fieldState.error) {
                                  return `Please select at least 3 days`
                                }
                                if (
                                  !fieldState.isTouched &&
                                  !fieldState.invalid
                                ) {
                                  return 'Please select a pick up date first'
                                }
                                return ' '
                              })()}
                            </FormHelperText>
                          </FormControl>
                        )
                      }}
                    />
                  </Grid>
                  <Grid xs={100} sm={100}>
                    <Controller
                      name="message"
                      control={control}
                      rules={{
                        validate: (value) => {
                          return value.length < 500 || 'Message is too long'
                        },
                      }}
                      render={({
                        field: { ref, value, ...rest },
                        fieldState,
                      }) => (
                        <TextField
                          label="Message"
                          multiline
                          rows={3}
                          value={value || ''}
                          helperText={
                            fieldState.error
                              ? fieldState.error.message
                              : 'Is recommended to add a message'
                          }
                          sx={{
                            paddingBlockEnd: 1,
                          }}
                          fullWidth
                          {...rest}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={100} sm={80} sx={{}}>
                    <Tooltip
                      title={
                        true
                          ? 'Please enter all required fields to submit the form'
                          : 'Click to submit the form'
                      }
                    >
                      <Typography
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          fullWidth
                          size="large"
                          sx={{
                            display: 'flex',
                            gap: 2,
                          }}
                          variant="contained"
                          aria-label="submit"
                          disabled={!isValid}
                          type="submit"
                          value="Submit"
                        >
                          <SendIcon />
                          Submit
                        </Button>
                      </Typography>
                    </Tooltip>
                  </Grid>
                  <Grid xs={100} sm={20}>
                    <Tooltip title="Reset the form">
                      <Typography sx={{ textAlign: 'center' }}>
                        <Button
                          fullWidth
                          sx={{
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                          }}
                          aria-label="reset"
                          size="large"
                          disabled={!isDirty}
                          type="reset"
                          value="Reset"
                          onClick={() => {
                            reset()
                          }}
                        >
                          <RotateLeftIcon />
                        </Button>
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </LocalizationProvider>
      {isSubmitSuccess !== null && (
        <IMuiSnackbar
          message={
            isSubmitSuccess
              ? 'Your request has been submitted'
              : 'There was an error submitting your request'
          }
          severity={isSubmitSuccess ? 'success' : 'error'}
          state={{
            open: true,
            vertical: 'top',
            horizontal: 'center',
          }}
          handleClose={() => setIsSubmitSuccess(null)}
        />
      )}
    </>
  )
}

export default ItemRequestForm
