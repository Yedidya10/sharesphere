'use client'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
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
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiBarcodeReader } from 'react-icons/bi'
import SpringModal from '../springModal/SpringModal'

interface FormValues {
  category: string
  isbn: string
  danacode: string
  barcode: string
  'item-name': string
  author: string
  brand: string
  'image-url': string
  description: string
  'item-condition': string
  'max-loan-period': string
  city: string
  'street-name': string
  'street-number': string
  'zip-code': string
}

export interface IItemPostForm {
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
   * How large should the ItemPostForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemPostForm contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const categories = [
  {
    value: 'book',
    label: 'Book',
    conditionTextValue: {
      5: 'New/Like New',
      4: 'Wrinkled Pages',
      3: 'Torn Cover',
      2: 'Scribbles Pages, Readable',
      1: 'Scribbles/Torn Pages, Unreadable',
    },
  },
  {
    value: 'board-game',
    label: 'Board Game',
    conditionTextValue: {
      5: 'New/Like New',
      4: 'Wrinkled Parts',
      3: 'Torn Parts',
      2: 'Parts are missing, Playable',
      1: 'Significant parts are missing, Unplayable',
    },
  },
]

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

const ItemPostForm: React.FC<IItemPostForm> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const { data: session, status } = useSession()

  const regexTextPattern = /^[א-ת\s]+$/u
  const regexImageUrlPattern =
    /https?:\/\/[^\s\/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)/m
  const regexDanacodePattern = /^\w{12}$/
  const regexIsbnPattern = /^\d{10}(?:\d{3})?$/
  const regexBarcodePattern = /^\d{12,13}$/
  const regexMaxLoanPeriodPattern = /^(?:[3-9]|1[0-4])$/
  const regexAddressNumPattern = /^[0-9]+$/
  const regexZipCodePattern = /^[0-9]{7}$/

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

  const [user, setUser] = useState({
    streetName: 'David Hameleh',
    streetNumber: '1',
    city: 'Jerusalem',
    zipCode: '1234567',
  })

  const { watch, reset, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      category: '',
      isbn: '',
      danacode: '',
      barcode: '',
      'item-name': '',
      author: '',
      brand: '',
      'image-url': '',
      description: '',
      'item-condition': '',
      'max-loan-period': '',
      city: '',
      'street-name': '',
      'street-number': '',
      'zip-code': '',
    },
  })

  // async function fetchUserData() {
  //   try {
  //     const response = await fetch('/api/user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(session?.user?.email),
  //     })
  //     const responseData = await response.json()
  //     if (response.ok) {
  //       console.log('User:', responseData)
  //       // Optionally, you can redirect the user to a success page
  //       // or show a success message on the form.
  //       return responseData
  //     } else {
  //       console.log('Failed to get user:', responseData)
  //       // Optionally, you can show an error message on the form.
  //     }
  //   } catch (error) {
  //     console.log('Error:', error)
  //   }
  // }

  const onSubmit = async (data: FormValues) => {
    try {
      const card = {
        cardIds: {
          isbn: data.isbn,
          danacode: data.danacode,
          barcode: data.barcode,
        },
        details: {
          category: data.category,
          name: data['item-name'],
          author: data.author,
          brand: data.brand,
          description: data.description,
          imageUrl: data['image-url'],
        },
        condition: data['item-condition'],
        maxLoanPeriod: data['max-loan-period'],
        location: {
          city: data.city,
          streetName: data['street-name'],
          streetNumber: data['street-number'],
          zipCode: data['zip-code'],
        },
        owner: {
          id: session?.user!.id,
        },
      }

      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
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

  return (
    <SpringModal handleClose={handleClose} openModal={openModal} label={''}>
      {status === 'authenticated' ? (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="category"
            rules={{
              required: 'Please select your category',
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState,
            }) => (
              <TextField
                fullWidth
                id={name}
                inputRef={ref}
                value={value}
                select
                label="Select Category"
                helperText="Please select your category"
                error={!!fieldState.error}
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {watch('category') && (
            <>
              {watch('category') === 'book' && (
                <Grid
                  container
                  columnSpacing={2}
                  sx={{
                    paddingBlockStart: 3,
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <Controller
                      control={control}
                      name="isbn"
                      rules={{
                        required: 'Please enter a isbn number',
                        pattern: {
                          value: /^\d{10}(?:\d{3})?$/,
                          message: 'Please enter a valid isbn number',
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <FormControl
                          fullWidth
                          sx={{
                            m: 1,
                          }}
                          error={!!fieldState?.error}
                        >
                          <InputLabel htmlFor="isbn">ISBN number</InputLabel>
                          <OutlinedInput
                            id={name}
                            inputRef={ref}
                            value={value}
                            inputProps={{
                              inputMode: 'numeric',
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <Tooltip title="Will be implemented soon">
                                  <span>
                                    <IconButton
                                      disabled
                                      aria-label="barcode reader button"
                                      onClick={handleClickBarcodeReader}
                                      edge="end"
                                    >
                                      <BiBarcodeReader />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </InputAdornment>
                            }
                            label="ISBN number"
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          />
                          <FormHelperText>
                            {fieldState.error ? fieldState.error.message : ' '}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      control={control}
                      name="danacode"
                      rules={{
                        required: 'Please enter a danacode number',
                        pattern: {
                          value: regexDanacodePattern,
                          message: 'Please enter a valid danacode number',
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <FormControl
                          fullWidth
                          sx={{ m: 1 }}
                          error={!!fieldState.error}
                        >
                          <InputLabel htmlFor="danacode">
                            Danacode number
                          </InputLabel>
                          <OutlinedInput
                            id={name}
                            inputRef={ref}
                            value={value}
                            inputProps={{
                              inputMode: 'numeric',
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <Tooltip title="Will be implemented soon">
                                  <span>
                                    {' '}
                                    <IconButton
                                      disabled
                                      aria-label="barcode reader button"
                                      onClick={handleClickBarcodeReader}
                                      edge="end"
                                    >
                                      <BiBarcodeReader />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </InputAdornment>
                            }
                            label="Danacode number"
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          />
                          <FormHelperText>
                            {fieldState.error ? fieldState.error.message : ' '}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              )}
              {watch('category') === 'board-game' && (
                <Box
                  sx={{
                    paddingBlockStart: 3,
                  }}
                >
                  <Controller
                    control={control}
                    name="barcode"
                    rules={{
                      required: 'Please enter a barcode number',
                      pattern: {
                        value: regexBarcodePattern,
                        message: 'Please enter a valid barcode number',
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState,
                    }) => (
                      <FormControl
                        fullWidth
                        sx={{
                          m: 1,
                        }}
                        error={!!fieldState.error}
                      >
                        <InputLabel htmlFor="barcode">
                          Barcode number
                        </InputLabel>
                        <OutlinedInput
                          id={name}
                          inputRef={ref}
                          value={value}
                          inputProps={{
                            inputMode: 'numeric',
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <Tooltip title="Will be implemented soon">
                                <span>
                                  <IconButton
                                    disabled
                                    aria-label="barcode reader button"
                                    onClick={handleClickBarcodeReader}
                                    edge="end"
                                  >
                                    <BiBarcodeReader />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            </InputAdornment>
                          }
                          label="Barcode number"
                          onChange={onChange} // send value to hook form
                          onBlur={onBlur} // notify when input is touched/blur
                        />
                        <FormHelperText>
                          {fieldState.error ? fieldState.error.message : ' '}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Box>
              )}
              {watch('isbn') || watch('danacode') || watch('barcode') ? (
                <>
                  <Box
                    sx={{
                      paddingBlockStart: 3,
                    }}
                  >
                    <Grid container columnSpacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          control={control}
                          name={'item-name'}
                          rules={{
                            required: 'Please select a item-name',
                            pattern: {
                              value: regexTextPattern,
                              message: 'Please enter a valid item name',
                            },
                            // validate: (value) => testTextPattern(value),
                          }}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => {
                            console.log('Value:', value)

                            return (
                              <TextField
                                fullWidth
                                id={name}
                                inputRef={ref}
                                name={name}
                                value={value}
                                label={`${watch('category'!)
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(' ')} Name`}
                                helperText={
                                  fieldState.error
                                    ? fieldState.error.message
                                    : ' '
                                }
                                error={!!fieldState.error}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                            )
                          }}
                        />
                      </Grid>
                      {watch('category') === 'book' ? (
                        <Grid item xs={12} sm={6}>
                          <Controller
                            control={control}
                            name="author"
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                              fieldState,
                            }) => (
                              <TextField
                                fullWidth
                                id={name}
                                inputRef={ref}
                                value={value}
                                label="Author"
                                helperText={
                                  fieldState.error
                                    ? fieldState.error.message
                                    : ' '
                                }
                                error={!!fieldState.error}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                            )}
                          />
                        </Grid>
                      ) : (
                        <></>
                      )}
                      {watch('category') === 'board-game' ? (
                        <Grid item xs={12} sm={6}>
                          <Controller
                            control={control}
                            name="brand"
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                              fieldState,
                            }) => (
                              <TextField
                                id={name}
                                inputRef={ref}
                                value={value}
                                fullWidth
                                label="Brand"
                                helperText={
                                  fieldState.error
                                    ? fieldState.error.message
                                    : ' '
                                }
                                error={!!fieldState.error}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                            )}
                          />
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <Controller
                      control={control}
                      name="image-url"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <TextField
                          id={name}
                          inputRef={ref}
                          value={value}
                          fullWidth
                          label="Image Link"
                          helperText={
                            fieldState.error ? fieldState.error.message : ' '
                          }
                          error={!!fieldState.error}
                          onChange={onChange} // send value to hook form
                          onBlur={onBlur} // notify when input is touched/blur
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="description"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <TextField
                          id={name}
                          inputRef={ref}
                          value={value}
                          label="Description"
                          fullWidth
                          helperText={
                            fieldState.error ? fieldState.error.message : ' '
                          }
                          error={!!fieldState.error}
                          multiline
                          rows={3}
                          onChange={onChange} // send value to hook form
                          onBlur={onBlur} // notify when input is touched/blur
                        />
                      )}
                    />
                  </Box>
                  <Grid
                    container
                    columnSpacing={2}
                    sx={{
                      paddingBlockStart: 3,
                    }}
                  >
                    <Grid item xs={12} sm={7}>
                      <Controller
                        control={control}
                        name="item-condition"
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState,
                        }) => (
                          <TextField
                            id={name}
                            inputRef={ref}
                            value={value}
                            fullWidth
                            select
                            label={`Select ${watch('category')
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')} condition`}
                            helperText={
                              fieldState.error ? fieldState.error.message : ' '
                            }
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          >
                            {watch('category') &&
                              categories.map((option) =>
                                option.value === watch('category')
                                  ? Object.entries(option.conditionTextValue)
                                      .reverse()
                                      .map(([key, value]) => (
                                        <MenuItem key={key} value={key}>
                                          {value}
                                        </MenuItem>
                                      ))
                                  : null
                              )}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Controller
                        control={control}
                        name="max-loan-period"
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState,
                        }) => (
                          <TextField
                            id={name}
                            inputRef={ref}
                            value={value}
                            label="Max loan period"
                            fullWidth
                            inputProps={{
                              inputMode: 'numeric',
                            }}
                            helperText={
                              fieldState.error ? fieldState.error.message : ' '
                            }
                            error={!!fieldState.error}
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

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
                      }}
                    >
                      {`${watch('category')
                        .split(' ')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
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
                              What is the reason for requesting this
                              information?
                            </Typography>
                            {`We require the address to calculate the distance
                            between the item's location and the borrower. Rest
                            assured, the address will not be made public, and it
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
                      control={<Checkbox />}
                      label="Use my current address"
                    />
                    <Grid container columnSpacing={1} columns={20}>
                      <Grid item xs={20} sm={10} md={5}>
                        <Controller
                          control={control}
                          name="city"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <TextField
                              id={name}
                              inputRef={ref}
                              value={value}
                              fullWidth
                              label="City"
                              type="text"
                              helperText={
                                fieldState.error
                                  ? fieldState.error.message
                                  : ' '
                              }
                              error={!!fieldState.error}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={20} sm={10} md={6}>
                        <Controller
                          control={control}
                          name="street-name"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <TextField
                              id={name}
                              inputRef={ref}
                              value={value}
                              fullWidth
                              label="Street Name"
                              type="text"
                              helperText={
                                fieldState.error
                                  ? fieldState.error.message
                                  : ' '
                              }
                              error={!!fieldState.error}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={20} sm={10} md={4}>
                        <Controller
                          control={control}
                          name="street-number"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <TextField
                              id={name}
                              inputRef={ref}
                              value={value}
                              fullWidth
                              label="St. Number"
                              inputProps={{
                                inputMode: 'numeric',
                              }}
                              helperText={
                                fieldState.error
                                  ? fieldState.error.message
                                  : ' '
                              }
                              error={!!fieldState.error}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={20} sm={10} md={5}>
                        <Controller
                          control={control}
                          name="zip-code"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <TextField
                              id={name}
                              inputRef={ref}
                              value={value}
                              fullWidth
                              label="Zip Code"
                              inputProps={{
                                inputMode: 'numeric',
                              }}
                              helperText={
                                fieldState.error
                                  ? fieldState.error.message
                                  : ' '
                              }
                              error={!!fieldState.error}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </>
          )}
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
              m: 'auto',
            }}
            // disabled={allErrorsFalse}
            type="reset"
            value="Reset"
            onClick={() => {
              reset()
            }}
          >
            Reset
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '1rem',
            }}
          >
            Please log in to post an item:
          </Typography>
          <Button
            size="large"
            variant="contained"
            sx={{
              mt: 2,
            }}
            href="/auth/login?callbackUrl=http://127.0.0.1:3000"
          >
            Go to login screen
          </Button>
        </Box>
      )}
    </SpringModal>
  )
}

export default ItemPostForm
