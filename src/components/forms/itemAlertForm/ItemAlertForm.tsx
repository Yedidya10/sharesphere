'use client'

import { ItemAlertFormValues } from '@/utils/types/formValues'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import he from 'date-fns/locale/he'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface IItemAlertForm {
  open: boolean
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
   * How large should the ItemAlertForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemAlertForm contents
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

const ItemAlertForm: React.FC<IItemAlertForm> = ({
  primary = false,
  label,
  open,
  cardId,
}) => {
  const { data: session, status } = useSession()

  const [address, setAddress] = useState({})

  const {
    watch,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ItemAlertFormValues>({
    defaultValues: {
      pickupDate: '',
      returnDate: '',
    },
  })

  const onSubmit = async (data: ItemAlertFormValues) => {
    try {
      const itemAlert = {
        subscriberId: session?.user?.id,
        alertsRequested: true,
      }
      const res = await fetch(`/api/cards/cardId/${cardId}/update/itemAlert`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemAlert,
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
      {open && status === 'authenticated' && (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { maxWidth: '100%' },
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
                  name="pickupDate"
                  control={control}
                  rules={{
                    required: 'Please enter a pick up date',
                  }}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <DatePicker
                      label="Start date"
                      disablePast
                      maxDate={watch('returnDate')}
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="returnDate"
                  control={control}
                  rules={{
                    required: 'Please enter a return date',
                  }}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <DatePicker
                      label="End date"
                      disablePast
                      minDate={watch('pickupDate')}
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
          ) : (
            <></>
          )}
          <Button
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="small"
            disabled={!isDirty}
            type="reset"
            value="Reset"
            onClick={() => {
              reset()
            }}
          >
            <Typography>נקה</Typography>
          </Button>
        </Box>
      )}
    </LocalizationProvider>
  )
}

export default ItemAlertForm
