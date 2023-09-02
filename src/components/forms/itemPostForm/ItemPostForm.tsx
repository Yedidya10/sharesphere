'use client'

import categories from '@/utils/categories/categories'
import {
  regexAddressNamePattern,
  regexAddressNumberPattern,
  regexBarcodePattern,
  regexDanacodePattern,
  regexImageUrlPattern,
  regexIsbnPattern,
  regexMaxLoanPeriodPattern,
  regexTextPattern,
  regexZipCodePattern,
} from '@/utils/regexPatterns'
import { AddItemFormValues } from '@/utils/types/FormValues'
import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { StepButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiBarcodeReader } from 'react-icons/bi'
import SpringModal from '../../springModal/SpringModal'
import { NextLinkComposed } from '@/components/mui/Link'

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

const steps = [
  'Instructions',
  'Category',
  'Item ID',
  'Details',
  'Location',
  'Review',
]

const ItemPostForm: React.FC<IItemPostForm> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const { data: session, status } = useSession()
  const [ownerId, setOwnerId] = useState<string>('')

  const isStepOptional = (step: number) => {
    return (
      step !== 0 &&
      step !== 1 &&
      step !== 2 &&
      step !== 3 &&
      step !== 4 &&
      step !== 5
    )
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  React.useEffect(() => {
    if (session) {
      setOwnerId(session.user!.id)
    }
  }, [session])

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
  } = useForm<AddItemFormValues>({
    mode: 'onChange',
    defaultValues: {
      mainCategory: '',
      secondaryCategory: '',
      tertiaryCategory: '',
      isbn: '',
      danacode: '',
      barcode: '',
      itemName: '',
      author: '',
      brand: '',
      imageUrl: '',
      description: '',
      itemCondition: '',
      maxLoanPeriod: '',
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
    },
  })

  const onSubmit = async (data: AddItemFormValues) => {
    try {
      const card: ItemCoreWithLoanDetails = {
        cardIds: {
          isbn: data.isbn,
          danacode: data.danacode,
          barcode: data.barcode,
        },
        details: {
          mainCategory: data.mainCategory,
          secondaryCategory: data.secondaryCategory,
          tertiaryCategory: data.tertiaryCategory,
          name: data.itemName,
          author: data.author,
          brand: data.brand,
          description: data.description,
          imageUrl: data.imageUrl,
        },
        condition: parseFloat(data.itemCondition),
        maxLoanPeriod: parseFloat(data.maxLoanPeriod),
        location: {
          city: data.city,
          streetName: data.streetName,
          streetNumber: data.streetNumber,
          zipCode: data.zipCode,
        },
        owner: ownerId,
        status: 'active',
        allBorrowers: [],
        currentBorrower: {
          borrowerId: '',
          startDate: null,
          endDate: null,
          loanPeriod: 0,
        },
        pendingRequests: [],
        rejectedRequests: [],
        approvedRequests: [],
        alertSubscribers: [],
      }

      const response = await fetch('/api/card', {
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

  const handleResetForm = () => {
    setActiveStep(1)
    reset()
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

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography
              sx={{
                paddingBlockEnd: 2,
              }}
            >
              If you have multiple items to share with the community, please
              fill out the form for each item separately, even if they are of
              the same category.
            </Typography>
            <Typography
              sx={{
                paddingBlockEnd: 2,
              }}
            >
              If you have the same item in different conditions, For example, if
              you have two copies of the same book, one in good condition and
              one in excellent condition, you can fill out the form once, click
              on the &nbsp;
              <Typography
                sx={{
                  display: 'inline',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                Add copy
              </Typography>
              &nbsp; button and then select its condition status and maximum
              loan days.
            </Typography>
          </Box>
        )
      case 1:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              paddingBlockStart: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '.8rem',
                  fontWeight: 500,
                  paddingBlockEnd: 2,
                }}
              >
                Please select your item category:
              </Typography>
              <Controller
                control={control}
                name="mainCategory"
                rules={{
                  required: 'Category is required',
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
                    required
                    select
                    label="Category"
                    helperText={
                      fieldState.isDirty ? '' : 'Please select your category'
                    }
                    error={!!fieldState.error}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '.8rem',
                  fontWeight: 500,
                  paddingBlockEnd: 2,
                }}
              >
                Please select your item sub-category:
              </Typography>
              <Controller
                control={control}
                name="secondaryCategory"
                rules={{
                  required: 'Sub-category is required',
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
                    required
                    select
                    label="Sub-category"
                    helperText={
                      fieldState.isDirty
                        ? ''
                        : 'Please select your sub-category'
                    }
                    error={!!fieldState.error}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    {watch('mainCategory') &&
                      categories
                        .find(
                          (category) => category.value === watch('mainCategory')
                        )
                        ?.subCategories?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                  </TextField>
                )}
              />
            </Box>
          </Box>
        )
      case 2:
        return (
          <>
            {watch('mainCategory') && (
              <>
                {watch('mainCategory') === 'book' && (
                  <Box
                    sx={{
                      paddingBlockStart: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '.9rem',
                        fontWeight: 500,
                        paddingBlockEnd: 0.5,
                        gap: 1,
                      }}
                      component={'p'}
                    >
                      Please enter either the book&apos;s ISBN or Danacode
                      number:
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography
                              color="inherit"
                              sx={{
                                fontSize: '.8rem',
                              }}
                            ></Typography>
                            {`ISBN is a global identifier for books,
                          while Danacode is a unique identification code used in Israel
                          for books written in Hebrew or other languages distributed in Israel`}
                          </React.Fragment>
                        }
                      >
                        <InfoOutlinedIcon
                          sx={{
                            fontSize: '16px',
                          }}
                        />
                      </HtmlTooltip>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '.8rem',
                        paddingBlockEnd: 2,
                      }}
                    >
                      It is recommended to enter both numbers.
                    </Typography>
                    <Grid container columnSpacing={2}>
                      <Grid xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="isbn"
                          rules={{
                            required: {
                              value:
                                !watch('danacode') ||
                                getFieldState('danacode').invalid
                                  ? true
                                  : false,
                              message: 'ISBN number is required',
                            },
                            pattern: {
                              value: regexIsbnPattern,
                              message:
                                'Please enter a valid isbn number with 10 or 13 digits',
                            },
                          }}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <FormControl
                              fullWidth
                              required
                              error={!!fieldState?.error}
                            >
                              <InputLabel htmlFor="isbn">
                                ISBN number
                              </InputLabel>
                              <OutlinedInput
                                id={name}
                                inputRef={ref}
                                value={value}
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
                                onChange={onChange}
                                onBlur={onBlur}
                              />
                              <FormHelperText>
                                {(function () {
                                  if (fieldState.error) {
                                    return fieldState.error.message
                                  }
                                  if (!fieldState.isDirty) {
                                    return 'Please enter ISBN number'
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
                      <Grid xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="danacode"
                          rules={{
                            required: {
                              value:
                                !watch('isbn') || getFieldState('isbn').invalid
                                  ? true
                                  : false,
                              message: 'Danacode number is required',
                            },
                            pattern: {
                              value: regexDanacodePattern,
                              message:
                                'Please enter a valid danacode number with 12 digits',
                            },
                          }}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <FormControl
                              fullWidth
                              required
                              error={!!fieldState.error}
                            >
                              <InputLabel htmlFor="danacode">
                                Danacode number
                              </InputLabel>
                              <OutlinedInput
                                id={name}
                                inputRef={ref}
                                value={value}
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
                                label="Danacode number"
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                              <FormHelperText>
                                {(function () {
                                  if (fieldState.error) {
                                    return fieldState.error.message
                                  }
                                  if (!fieldState.isDirty) {
                                    return 'Please enter Danacode number'
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
                {watch('mainCategory') !== 'book' && (
                  <Box
                    sx={{
                      paddingBlockStart: 4,
                    }}
                  >
                    <Controller
                      control={control}
                      name="barcode"
                      rules={{
                        required: 'Barcode number is required',
                        pattern: {
                          value: regexBarcodePattern,
                          message:
                            'Please enter a valid barcode number with 12-13 digits',
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <FormControl
                          fullWidth
                          required
                          error={!!fieldState.error}
                        >
                          <InputLabel htmlFor="barcode">
                            Barcode number
                          </InputLabel>
                          <OutlinedInput
                            id={name}
                            inputRef={ref}
                            value={value}
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
                            onChange={onChange}
                            onBlur={onBlur}
                          />
                          <FormHelperText>
                            {(function () {
                              if (fieldState.error) {
                                return fieldState.error.message
                              }
                              if (!fieldState.isDirty) {
                                return 'Please enter Barcode number'
                              }
                              if (!fieldState.invalid) {
                                return getValidText()
                              }
                            })()}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Box>
                )}
              </>
            )}
          </>
        )
      case 3:
        return (
          <>
            {(watch('danacode') && !getFieldState('danacode').invalid) ||
            (watch('barcode') && !getFieldState('barcode').invalid) ||
            (watch('isbn') && !getFieldState('isbn').invalid) ? (
              <>
                <Box
                  sx={{
                    paddingBlockStart: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.6rem',
                  }}
                >
                  <Grid container columnSpacing={2}>
                    <Grid xs={12} sm={6}>
                      <Controller
                        control={control}
                        name={'itemName'}
                        rules={{
                          required: `${watch('mainCategory'!)
                            .split(' ')
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ')} name is required`,
                          pattern: {
                            value: regexTextPattern,
                            message: `Please enter a valid ${watch(
                              'mainCategory'
                            )} name with only Hebrew or English letters`,
                          },
                        }}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState,
                        }) => {
                          return (
                            <FormControl
                              fullWidth
                              required
                              error={!!fieldState.error}
                            >
                              <TextField
                                id={name}
                                inputRef={ref}
                                required
                                name={name}
                                value={value}
                                label={`${watch('mainCategory'!)
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(' ')} Name`}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                              <FormHelperText>
                                {(function () {
                                  if (fieldState.error) {
                                    return fieldState.error.message
                                  }
                                  if (!fieldState.isDirty) {
                                    return `Please enter the
                                   ${watch('mainCategory')} name`
                                  }
                                  if (!fieldState.invalid) {
                                    return getValidText()
                                  }
                                })()}
                              </FormHelperText>
                            </FormControl>
                          )
                        }}
                      />
                    </Grid>
                    {watch('mainCategory') === 'book' ? (
                      <Grid xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="author"
                          rules={{
                            required: 'Author name is required',
                            pattern: {
                              value: regexTextPattern,
                              message:
                                'Please enter a valid author name with only Hebrew or English letters',
                            },
                          }}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <FormControl
                              fullWidth
                              required
                              error={!!fieldState.error}
                            >
                              <TextField
                                fullWidth
                                id={name}
                                inputRef={ref}
                                required
                                value={value}
                                label="Author"
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                              <FormHelperText>
                                {(function () {
                                  if (fieldState.error) {
                                    return fieldState.error.message
                                  }
                                  if (!fieldState.isDirty) {
                                    return 'Please enter author name'
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
                    ) : (
                      <></>
                    )}
                    {watch('mainCategory') === 'board-game' ? (
                      <Grid xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="brand"
                          rules={{
                            required: 'Brand name is required',
                            pattern: {
                              value: regexTextPattern,
                              message:
                                'Please enter a valid brand name with only Hebrew or English letters',
                            },
                          }}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState,
                          }) => (
                            <FormControl
                              fullWidth
                              required
                              error={!!fieldState.error}
                            >
                              <TextField
                                id={name}
                                inputRef={ref}
                                value={value}
                                required
                                fullWidth
                                label="Brand"
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                              <FormHelperText>
                                {(function () {
                                  if (fieldState.error) {
                                    return fieldState.error.message
                                  }
                                  if (!fieldState.isDirty) {
                                    return 'Please enter brand name'
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
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Controller
                    control={control}
                    name="imageUrl"
                    rules={{
                      required: 'Image link is required',
                      pattern: {
                        value: regexImageUrlPattern,
                        message:
                          'Please enter a valid image link (with image extension at the end)',
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState,
                    }) => (
                      <FormControl
                        fullWidth
                        required
                        error={!!fieldState.error}
                      >
                        <TextField
                          id={name}
                          inputRef={ref}
                          value={value}
                          required
                          label="Image Link"
                          onChange={onChange} // send value to hook form
                          onBlur={onBlur} // notify when input is touched/blur
                        />
                        <FormHelperText>
                          {(function () {
                            if (fieldState.error) {
                              return fieldState.error.message
                            }
                            if (!fieldState.isDirty) {
                              return 'Please enter image link'
                            }
                            if (!fieldState.invalid) {
                              return getValidText()
                            }
                          })()}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="description"
                    rules={{
                      required: 'Description is required',
                      // pattern: {
                      //   value: regexTextPattern,
                      //   message:
                      //     'Please enter a valid description with only Hebrew or English letters',
                      // },
                    }}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState,
                    }) => (
                      <FormControl
                        fullWidth
                        required
                        error={!!fieldState.error}
                      >
                        <TextField
                          id={name}
                          required
                          inputRef={ref}
                          value={value}
                          label="Description"
                          fullWidth
                          multiline
                          rows={3}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        <FormHelperText>
                          {(function () {
                            if (fieldState.error) {
                              return fieldState.error.message
                            }
                            if (!fieldState.isDirty) {
                              return 'Please enter description'
                            }
                            if (!fieldState.invalid) {
                              return getValidText()
                            }
                          })()}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Box>
                <Grid
                  container
                  columnSpacing={2}
                  sx={{
                    paddingBlockStart: 4,
                  }}
                >
                  <Grid xs={12} sm={7}>
                    <Controller
                      control={control}
                      name="itemCondition"
                      rules={{
                        required: `${watch('mainCategory')
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )} condition is required`,
                      }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <TextField
                          id={name}
                          inputRef={ref}
                          value={value}
                          required
                          fullWidth
                          select
                          label={`${watch('mainCategory')
                            .split(' ')
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ')} condition`}
                          helperText={
                            fieldState.error
                              ? fieldState.error.message
                              : `Please select ${watch(
                                  'mainCategory'
                                )} condition`
                          }
                          onChange={onChange}
                          onBlur={onBlur}
                        >
                          {watch('mainCategory') &&
                            categories.map((option) =>
                              option.value === watch('mainCategory')
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
                  <Grid xs={12} sm={5}>
                    <Controller
                      control={control}
                      name="maxLoanPeriod"
                      rules={{
                        required: 'Max loan period is required',
                        pattern: {
                          value: regexMaxLoanPeriodPattern,
                          message: 'Please enter a valid number between 3-14',
                        },
                        // @ts-ignore
                        valueAsNumber: true,
                      }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <FormControl
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
                            label="Max loan period"
                            onChange={onChange}
                            onBlur={onBlur}
                          />
                          <FormHelperText>
                            {(function () {
                              if (fieldState.error) {
                                return fieldState.error.message
                              }
                              if (!fieldState.isDirty) {
                                return 'Please enter max loan period'
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
              </>
            ) : (
              <></>
            )}
          </>
        )
      case 4:
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
                  {`${watch('mainCategory')
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
                  between the ${watch(
                    'mainCategory'
                  )}'s location and the borrower. Rest
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
                  control={<Checkbox />}
                  label="Use my current address"
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
                        <FormControl
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
                  <Grid xs={20} sm={10} md={5}>
                    <Controller
                      control={control}
                      name="zipCode"
                      rules={{
                        required: 'Zip code is required',
                        pattern: {
                          value: regexZipCodePattern,
                          message:
                            'Please enter a valid zip code with 7 digits',
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                      }) => (
                        <FormControl
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
              </Box>
            )}
          </>
        )
      case 5:
        return (
          <>
            {watch('mainCategory') && (
              <>
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
              </>
            )}
          </>
        )
      default:
        return <></>
    }
  }

  const isNextDisabled = () => {
    type FormFieldName =
      | 'mainCategory'
      | 'secondaryCategory'
      | 'tertiaryCategory'
      | 'isbn'
      | 'danacode'
      | 'barcode'
      | 'itemName'
      | 'author'
      | 'brand'
      | 'imageUrl'
      | 'description'
      | 'itemCondition'
      | 'maxLoanPeriod'
      | 'city'
      | 'streetName'
      | 'streetNumber'
      | 'zipCode'

    if (activeStep === 1) {
      // Define an array of field names that are required for the current step.
      const requiredFields: FormFieldName[] = ['mainCategory'] // Modify this based on your actual form.

      // Check if any of the required fields are empty or invalid.
      for (const fieldName of requiredFields) {
        const fieldState = getFieldState(fieldName)
        if (!fieldState.isDirty || fieldState.invalid) {
          return true // Disable "Next" if a required field is not filled or invalid.
        }
      }
    }

    if (activeStep === 2) {
      // Define an array of field names that are required for the current step.
      const requiredFields: FormFieldName[] = [] // Modify this based on your actual form.

      if (watch('mainCategory') === 'book') {
        requiredFields.push('isbn', 'danacode')
      } else {
        requiredFields.push('barcode')
      }

      // Check if any of the required fields are empty or invalid.
      for (const fieldName of requiredFields) {
        const fieldState = getFieldState(fieldName)
        if (!fieldState.isDirty || fieldState.invalid) {
          return true // Disable "Next" if a required field is not filled or invalid.
        }
      }
    }

    if (activeStep === 3) {
      // Define an array of field names that are required for the current step.
      const requiredFields: FormFieldName[] = [
        'itemName',
        'imageUrl',
        'description',
        'itemCondition',
        'maxLoanPeriod',
      ] // Modify this based on your actual form.

      // Check if any of the required fields are empty or invalid.
      for (const fieldName of requiredFields) {
        const fieldState = getFieldState(fieldName)
        if (!fieldState.isDirty || fieldState.invalid) {
          return true // Disable "Next" if a required field is not filled or invalid.
        }
      }
    }

    if (activeStep === 4) {
      // Define an array of field names that are required for the current step.
      const requiredFields: FormFieldName[] = [
        'city',
        'streetName',
        'streetNumber',
        'zipCode',
      ] // Modify this based on your actual form.

      // Check if any of the required fields are empty or invalid.
      for (const fieldName of requiredFields) {
        const fieldState = getFieldState(fieldName)
        if (!fieldState.isDirty || fieldState.invalid) {
          return true // Disable "Next" if a required field is not filled or invalid.
        }
      }
    }

    return false // Enable "Next" for other cases (all required fields are filled and valid).
  }

  return (
    <SpringModal
      handleClose={handleClose}
      openModal={openModal}
      label={''}
      keepMounted={true}
    >
      {status === 'authenticated' ? (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { maxWidth: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Add New Item
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              paddingBlock: 4,
            }}
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                )
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepButton onClick={handleStep(index)} {...labelProps}>
                    {label}
                  </StepButton>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleClose}>Close</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <IconButton
                  onClick={handleResetForm}
                  type="reset"
                  value="Reset"
                  title="Reset form"
                  disabled={!isDirty}
                >
                  <RestartAltIcon />
                </IconButton>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext} disabled={isNextDisabled()}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
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
            component={NextLinkComposed}
            to="/login"
          >
            Go to login screen
          </Button>
        </Box>
      )}
    </SpringModal>
  )
}

export default ItemPostForm
