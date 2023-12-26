'use client'

import { ItemRequestFormValues } from '@/utils/types/FormValues'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import { DatePicker, DateValidationError } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { addDays, differenceInDays } from 'date-fns'
import he from 'date-fns/locale/he'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface IItemRequestForm {
  open: boolean
  maxLoanPeriod: number
  cardId: string
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

function calculateMaxDate(startDate: Date, maxLoanPeriod: number): Date {
  const maxDate = addDays(startDate, maxLoanPeriod)
  return maxDate
}

const ItemRequestForm: React.FC<IItemRequestForm> = ({
  primary = false,
  label,
  maxLoanPeriod,
  cardId,
  open,
}) => {
  const { data: session, status } = useSession()

  // const [endDateError, setEndDateError] =
  //   React.useState<DateValidationError | null>(null)
  // const [startDateError, setStartDateError] =
  //   React.useState<DateValidationError | null>(null)

  // const startDateErrorMessage = React.useMemo(() => {
  //   switch (startDateError) {
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
  // }, [startDateError])

  // const endDateErrorMessage = React.useMemo(() => {
  //   switch (endDateError) {
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
  // }, [endDateError])

  const {
    watch,
    control,
    setFocus,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ItemRequestFormValues>({
    defaultValues: {
      message: '',
      startDate: '',
      endDate: '',
    },
  })

  const onSubmit = async (data: ItemRequestFormValues) => {
    try {
      const startDate = new Date(data.startDate)
      const endDate = new Date(data.endDate)

      const itemLoanRequest = {
        borrowerId: session?.user?.id,
        requestStartDate: data.startDate,
        requestEndDate: data.endDate,
        loanPeriod: differenceInDays(endDate, startDate),
        message: data.message,
      }

      const res = await fetch(
        `/api/cards/cardId/${cardId}/update/itemRequest`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemLoanRequest,
          }),
        }
      )

      const json = await res.json()
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
      {open && status === 'authenticated' && (
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
              <Grid xs={100} sm={50}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{
                    required: 'Please enter a pick up date',
                  }}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <DatePicker
                      label="Start date"
                      disablePast
                      maxDate={watch('endDate')}
                      value={value || null}
                      slotProps={{
                        textField: {
                          helperText: fieldState.error
                            ? fieldState.error.message
                            : ' ',
                          fullWidth: true,
                        },
                      }}
                      {...rest}
                    />
                  )}
                />
              </Grid>
              <Grid xs={100} sm={50}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: 'Please enter a return date',
                  }}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <DatePicker
                      label="End date"
                      disablePast
                      minDate={watch('startDate')}
                      maxDate={calculateMaxDate(
                        new Date(watch('startDate')),
                        maxLoanPeriod
                      )}
                      value={value || null}
                      slotProps={{
                        textField: {
                          helperText: fieldState.error
                            ? fieldState.error.message
                            : ' ',
                          fullWidth: true,
                        },
                      }}
                      {...rest}
                    />
                  )}
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
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
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
      )}
    </LocalizationProvider>
  )
}

export default ItemRequestForm
