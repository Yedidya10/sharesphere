'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SpringModal from '../../springModal/SpringModal'

import { DatePicker, DateValidationError } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface FormValues {
  'start-date': object
  'end-date': object
}

export interface IItemRequestForm {
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

const ItemRequestForm: React.FC<IItemRequestForm> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const { data: session, status } = useSession()

  // State to store the selected start date and end date
  const [startDate, setStartDate] = useState<object | null>(null)
  const [endDate, setEndDate] = useState<object | null>(null)

  const [endDateError, setEndDateError] =
    React.useState<DateValidationError | null>(null)
  const [startDateError, setStartDateError] =
    React.useState<DateValidationError | null>(null)

  const startDateErrorMessage = React.useMemo(() => {
    switch (startDateError) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date in the first quarter of 2022'
      }

      case 'invalidDate': {
        return 'Your date is not valid'
      }

      default: {
        return ''
      }
    }
  }, [startDateError])

  const endDateErrorMessage = React.useMemo(() => {
    switch (endDateError) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date in the first quarter of 2022'
      }

      case 'invalidDate': {
        return 'Your date is not valid'
      }

      default: {
        return ''
      }
    }
  }, [endDateError])

  const [user, setUser] = useState({
    streetName: 'David Hameleh',
    streetNumber: '1',
    city: 'Jerusalem',
    zipCode: '1234567',
  })

  const {
    watch,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      'start-date': {},
      'end-date': {},
    },
  })

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    try {
      const itemLoanRequest = {}
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SpringModal handleClose={handleClose} openModal={openModal} label={''}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box>
            <Typography>בחירת תקופת השאלה</Typography>

            <Grid
              container
              columnSpacing={2}
              sx={{
                paddingBlockStart: 3,
              }}
            >
              <Grid item xs={12} sm={6}>
                <Controller
                  name="start-date"
                  control={control}
                  rules={{
                    required: 'Please enter a pick up date',
                  }}
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <DatePicker
                      label="Start date"
                      format="dd/MM/yyyy"
                      disablePast
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="end-date"
                  control={control}
                  rules={{
                    required: 'Please enter a return date',
                  }}
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <DatePicker
                      label="End date"
                      format="dd/MM/yyyy"
                      disablePast
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
            </Grid>
          </Box>
          {true ? (
            <Tooltip
              followCursor
              title={
                true
                  ? 'Please enter all required fields to submit the form'
                  : 'Click to submit the form'
              }
            >
              <span>
                <Button
                  sx={{
                    p: 2,
                    m: 1,
                  }}
                  variant="contained"
                  fullWidth
                  // disabled={allErrorsFalse}
                  type="submit"
                  value="Submit"
                >
                  Submit
                </Button>
              </span>
            </Tooltip>
          ) : (
            <></>
          )}
          <Button
            sx={{
              p: 2,
              m: 1,
            }}
            variant="contained"
            fullWidth
            // disabled={allErrorsFalse}
            type="reset"
            value="Reset"
            onClick={() => {
              reset()
            }}
          >
            נקה
          </Button>
        </Box>
      </SpringModal>
    </LocalizationProvider>
  )
}

export default ItemRequestForm
