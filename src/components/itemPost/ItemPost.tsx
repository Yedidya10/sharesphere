'use client'

import { useForm, Controller } from 'react-hook-form'
import useSWR, { Fetcher } from 'swr'
import { ChangeEvent, useEffect, useState } from 'react'
import validateISBN from '../../utils/func/validateISBN'
import validateBarcode from '@/utils/func/validateBarcode'
import SpringModal from '../springModal/SpringModal'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { BiBarcodeReader } from 'react-icons/bi'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import React from 'react'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { useSession } from 'next-auth/react'

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

export interface IItemPost {
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
   * How large should the ItemPost be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemPost contents
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

const ItemPost: React.FC<IItemPost> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const { data: session, status } = useSession()

  const [formValues, setFormValues] = useState<FormValues | {}>({})
  const [useUserAddress, setUseUserAddress] = useState<boolean>(false)

  const [category, setCategory] = useState<string>('')
  const [barcodeIsValid, setBarcodeIsValid] = useState<boolean>(false)

  const [itemCondition, setItemCondition] = useState<string>('')
  const [allErrorsFalse, setAllErrorsFalse] = useState<boolean>(false)

  const [nameError, setNameError] = useState<boolean>(false)
  const [authorError, setAuthorError] = useState<boolean>(false)
  const [brandError, setBrandError] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [isbnError, setIsbnError] = useState<boolean>(false)
  const [danacodeError, setDanacodeError] = useState<boolean>(false)
  const [barcodeError, setBarcodeError] = useState<boolean>(false)
  const [maxPeriodError, setMaxPeriodError] = useState<boolean>(false)
  const [cityError, setCityError] = useState<boolean>(false)
  const [streetNumError, setStreetNumError] = useState<boolean>(false)
  const [streetNameError, setStreetNameError] = useState<boolean>(false)
  const [zipCodeError, setZipCodeError] = useState<boolean>(false)

  // Combine all the error variables into an array
  const errorVariables = [
    nameError,
    authorError,
    brandError,
    imageError,
    descriptionError,
    isbnError,
    danacodeError,
    barcodeError,
    maxPeriodError,
    cityError,
    streetNumError,
    streetNameError,
    zipCodeError,
  ]

  // useEffect hook to update allErrorsFalseState whenever any of the error variables change

  const [nameHelperText, setNameHelperText] = useState<string>(
    ''
    // `Please enter the ${category} name`
  )
  const [authorHelperText, setAuthorHelperText] = useState<string>(
    ''
    // 'Please enter the author name'
  )
  const [brandHelperText, setBrandHelperText] = useState<string>(
    ''
    // 'Please enter the brand name'
  )
  const [imageHelperText, setImageHelperText] = useState<string>(
    ''
    // 'Please enter image link'
  )
  const [descriptionHelperText, setDescriptionHelperText] = useState<string>(
    ''
    // `Please enter the ${category} description`
  )
  const [isbnHelperText, setIsbnHelperText] = useState<string>(
    ''
    // `Please enter the isbn number`
  )
  const [danacodeHelperText, setDanacodeHelperText] = useState<string>(
    ''
    // `Please enter the isbn number`
  )
  const [maxPeriodHelperText, setMaxPeriodHelperText] = useState<string>(
    ''
    // `Please enter max loan period number`
  )
  const [barcodeHelperText, setBarcodeHelperText] = useState<string>(
    ''
    // `Please enter max loan period number`
  )

  const [cityHelperText, setCityHelperText] = useState<string>(``)
  const [streetNameHelperText, setStreetNameHelperText] = useState<string>(``)
  const [streetNumHelperText, setStreetNumHelperText] = useState<string>(``)
  const [zipCodeHelperText, setZipCodeHelperText] = useState<string>(``)

  // useEffect(() => {
  //   setNameHelperText(`Please enter the ${category} name`)
  //   setDescriptionHelperText(`Please enter the ${category} description`)
  // }, [category])

  useEffect(() => {
    setBarcodeIsValid(false)
  }, [category])

  const regexTextPattern = /^[א-ת\s]+$/u
  const regexImageUrlPattern =
    /https?:\/\/[^\s\/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)/m
  const regexDanacodePattern = /^\w{12}$/
  const regexIsbnPattern = /^\d{10}(?:\d{3})?$/
  const regexBarcodePattern = /^\d{12,13}$/
  const regexMaxLoanPeriodPattern = /^(?:[3-9]|1[0-4])$/
  const regexAddressNumPattern = /^[0-9]+$/
  const regexZipCodePattern = /^[0-9]{7}$/

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: string,
    fieldId: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setHelperText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value: inputValue, name } = event.target
    setFormValues({
      ...formValues,
      [name]: inputValue,
    })

    if (inputValue.trim() === '') {
      setError(true)
      return setHelperText('This field is required')
    }

    if (inputValue.trim() !== '') {
      if (type === 'text') {
        if (!regexTextPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid text')
        }

        if (regexTextPattern.test(inputValue)) {
          setError(false)
          setHelperText(
            ''
            // `Please enter the ${
            //   fieldId === 'item name' ? `${category} name` : `${fieldId}`
            // }`
          )
        }
      }

      if (fieldId === 'image link') {
        if (!regexImageUrlPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid url link')
        }
        if (regexImageUrlPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'isbn') {
        if (!regexIsbnPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid isbn number')
        }
        if (regexIsbnPattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'danacode') {
        if (!regexDanacodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid danacode number')
        }
        if (regexDanacodePattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'barcode') {
        if (!regexBarcodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid barcode number')
        }
        if (regexBarcodePattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'zip code') {
        if (!regexZipCodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid zip code (7 digits)')
        }
        if (regexZipCodePattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'street number') {
        if (!regexAddressNumPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid street number (digits only)')
        }
        if (regexAddressNumPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'max loan period') {
        if (!regexMaxLoanPeriodPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a number between 3 and 14')
        }
        if (regexMaxLoanPeriodPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }
    }
  }

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement>,
    type: string,
    fieldId: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setHelperText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value

    if (inputValue.trim() === '') {
      return
    }

    if (inputValue.trim() !== '') {
      if (type === 'text') {
        if (!regexTextPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid text')
        }

        if (regexTextPattern.test(inputValue)) {
          setError(false)
          setHelperText(
            ''
            // `Please enter the ${
            //   fieldId === 'item name' ? `${category} name` : `${fieldId}`
            // }`
          )
        }
      }

      if (fieldId === 'image link') {
        if (!regexImageUrlPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid url link')
        }

        if (regexImageUrlPattern.test(inputValue)) {
          setError(false)
          return setHelperText('Please enter image link')
        }
      }

      if (fieldId === 'isbn') {
        if (!regexIsbnPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid isbn number')
        }
        if (regexIsbnPattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'danacode') {
        if (!regexDanacodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid danacode number')
        }
        if (regexDanacodePattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'barcode') {
        if (!regexBarcodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid barcode number')
        }
        if (regexBarcodePattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'zip code') {
        if (!regexZipCodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid zip code (7 digits)')
        }
        if (regexZipCodePattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'street number') {
        if (!regexAddressNumPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid street number (digits only)')
        }
        if (regexAddressNumPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'max loan period') {
        if (!regexMaxLoanPeriodPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a number between 3 and 14')
        }
        if (regexMaxLoanPeriodPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }
    }
  }

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    type: string,
    fieldId: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setHelperText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value

    if (inputValue.trim() === '') {
      setError(false)
      return setHelperText(
        `Please enter the ${
          fieldId === 'item name' ? `${category} name` : `${fieldId}`
        }`
      )
    }

    if (inputValue.trim() !== '') {
      if (type === 'text') {
        if (!regexTextPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid text')
        }
        if (regexTextPattern.test(inputValue)) {
          setError(false)
          setHelperText(
            ''
            // `Please enter the ${
            //   fieldId === 'item name' ? `${category} name` : `${fieldId}`
            // }`
          )
        }
      }

      if (fieldId === 'image link') {
        if (!regexImageUrlPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid url link')
        }

        if (regexImageUrlPattern.test(inputValue)) {
          setError(false)
          return setHelperText('Please enter image link')
        }
      }

      if (fieldId === 'isbn') {
        if (!regexIsbnPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid isbn number')
        }
        if (regexIsbnPattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'danacode') {
        if (!regexDanacodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid danacode number')
        }
        if (regexDanacodePattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'barcode') {
        if (!regexBarcodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a valid barcode number')
        }
        if (regexBarcodePattern.test(inputValue)) {
          setError(false)
          setHelperText('')
          return setBarcodeIsValid(true)
        }
      }

      if (fieldId === 'zip code') {
        if (!regexZipCodePattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid zip code (7 digits)')
        }
        if (regexZipCodePattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'street number') {
        if (!regexAddressNumPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter valid street number (digits only)')
        }
        if (regexAddressNumPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }

      if (fieldId === 'max loan period') {
        if (!regexMaxLoanPeriodPattern.test(inputValue)) {
          setError(true)
          return setHelperText('Please enter a number between 3 and 14')
        }
        if (regexMaxLoanPeriodPattern.test(inputValue)) {
          setError(false)
          return setHelperText('')
        }
      }
    }
  }

  const testTextPattern = (value: string) => {
    if (!regexTextPattern.test(value)) {
      return false
    } else {
      return true
    }
  }
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

  const { watch, control, handleSubmit } = useForm<FormValues>({
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

  const onSubmit = async (data: FormValues) => {
    try {
      const card = {
        id: {
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
          id: '',
        },
      }
      console.log(card)
    } catch (error) {
      console.log(error)
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
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <TextField
                fullWidth
                id={name}
                ref={ref}
                value={value}
                select
                required
                label="Select Category"
                helperText="Please select your category"
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

          {/* <TextField
            fullWidth
            id="category"
            name="category"
            select
            required
            value={category}
            label="Select Category"
            helperText="Please select your category"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCategory(event.target.value)
              const { value, name } = event.target
              setFormValues({
                ...formValues,
                [name]: value,
              })
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
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
                        required: 'Please select a category',
                        pattern: regexIsbnPattern,
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
                          required
                          error={!!fieldState?.error}
                        >
                          <InputLabel htmlFor="isbn">ISBN number</InputLabel>
                          <OutlinedInput
                            id={name}
                            ref={ref}
                            value={value}
                            name="isbn"
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
                            // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            //   handleInputChange(
                            //     event,
                            //     '',
                            //     'isbn',
                            //     setIsbnError,
                            //     setIsbnHelperText
                            //   )
                            // }
                            // onFocus={(
                            //   event: React.FocusEvent<HTMLInputElement>
                            // ) =>
                            //   handleFocus(
                            //     event,
                            //     '',
                            //     'isbn',
                            //     setIsbnError,
                            //     setIsbnHelperText
                            //   )
                            // }
                            // onBlur={(
                            //   event: React.FocusEvent<HTMLInputElement>
                            // ) =>
                            //   handleBlur(
                            //     event,
                            //     '',
                            //     'isbn',
                            //     setIsbnError,
                            //     setIsbnHelperText
                            //   )
                            // }
                          />
                          <FormHelperText>
                            {fieldState?.error?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                    {/* <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                      }}
                      error={isbnError}
                    >
                      <InputLabel htmlFor="isbn">ISBN number</InputLabel>
                      <OutlinedInput
                        id="isbn"
                        name="isbn"
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            '',
                            'isbn',
                            setIsbnError,
                            setIsbnHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            '',
                            'isbn',
                            setIsbnError,
                            setIsbnHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            '',
                            'isbn',
                            setIsbnError,
                            setIsbnHelperText
                          )
                        }
                      />
                      <FormHelperText>{isbnHelperText}</FormHelperText>
                    </FormControl> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      control={control}
                      name="danacode"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
                        <FormControl
                          fullWidth
                          sx={{ m: 1 }}
                          error={danacodeError}
                        >
                          <InputLabel htmlFor="danacode">
                            Danacode number
                          </InputLabel>
                          <OutlinedInput
                            id={name}
                            ref={ref}
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
                          <FormHelperText>{danacodeHelperText}</FormHelperText>
                        </FormControl>
                      )}
                    />
                    {/* <FormControl fullWidth sx={{ m: 1 }} error={danacodeError}>
                       <InputLabel htmlFor="danacode">
                         Danacode number
                       </InputLabel>
                   
                      <OutlinedInput
                        id="danacode"
                        name="danacode"
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            '',
                            'danacode',
                            setDanacodeError,
                            setDanacodeHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            '',
                            'danacode',
                            setDanacodeError,
                            setDanacodeHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            '',
                            'danacode number',
                            setDanacodeError,
                            setDanacodeHelperText
                          )
                        }
                      />
                      <FormHelperText>{danacodeHelperText}</FormHelperText>
                    </FormControl> */}
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
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                    }) => (
                      <FormControl
                        fullWidth
                        sx={{
                          m: 1,
                        }}
                        error={barcodeError}
                      >
                        <InputLabel htmlFor="barcode">
                          Barcode number
                        </InputLabel>
                        <OutlinedInput
                          id={name}
                          ref={ref}
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
                        <FormHelperText>{barcodeHelperText}</FormHelperText>
                      </FormControl>
                    )}
                  />
                  {/* <FormControl
                    fullWidth
                    sx={{
                      m: 1,
                    }}
                    error={barcodeError}
                  >
                    <InputLabel htmlFor="barcode">Barcode number</InputLabel>
                    <OutlinedInput
                      id="barcode"
                      name="barcode"
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
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                          event,
                          '',
                          'barcode',
                          setBarcodeError,
                          setBarcodeHelperText
                        )
                      }
                      onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleFocus(
                          event,
                          '',
                          'barcode',
                          setBarcodeError,
                          setBarcodeHelperText
                        )
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          event,
                          '',
                          'barcode',
                          setBarcodeError,
                          setBarcodeHelperText
                        )
                      }
                    />
                    <FormHelperText>{barcodeHelperText}</FormHelperText>
                  </FormControl> */}
                </Box>
              )}
              {true && (
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
                            formState,
                          }) => {
                            console.log('Value:', value)
                            console.log('Field State:', fieldState)
                            console.log('Form State:', formState)

                            return (
                              <TextField
                                fullWidth
                                id={name}
                                ref={ref}
                                value={value}
                                label={`${category
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(' ')}Item Name`}
                                required
                                helperText={
                                  fieldState.error
                                    ? fieldState.error.message
                                    : ' '
                                }
                                error={!!fieldState.error}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                                // onChange={(
                                //   event: ChangeEvent<HTMLInputElement>
                                // ) =>
                                //   handleInputChange(
                                //     event,
                                //     'text',
                                //     'item name',

                                //     setNameError,
                                //     setNameHelperText
                                //   )
                                // }
                                // onFocus={(
                                //   event: React.FocusEvent<HTMLInputElement>
                                // ) =>
                                //   handleFocus(
                                //     event,
                                //     'text',
                                //     'item name',
                                //     setNameError,
                                //     setNameHelperText
                                //   )
                                // }
                                // onBlur={(
                                //   event: React.FocusEvent<HTMLInputElement>
                                // ) =>
                                //   handleBlur(
                                //     event,
                                //     'text',
                                //     'item name',
                                //     setNameError,
                                //     setNameHelperText
                                //   )
                                // }
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
                            }) => (
                              <TextField
                                fullWidth
                                id={name}
                                ref={ref}
                                value={value}
                                label="Author"
                                required
                                helperText={authorHelperText}
                                error={authorError}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                            )}
                          />

                          {/* <TextField
                            fullWidth
                            id="author-name"
                            name="author-name"
                            label="Author"
                            required
                            helperText={authorHelperText}
                            error={authorError}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(
                                event,
                                'text',
                                'author name',
                                setAuthorError,
                                setAuthorHelperText
                              )
                            }
                            onFocus={(
                              event: React.FocusEvent<HTMLInputElement>
                            ) =>
                              handleFocus(
                                event,
                                'text',
                                'author name',
                                setAuthorError,
                                setAuthorHelperText
                              )
                            }
                            onBlur={(
                              event: React.FocusEvent<HTMLInputElement>
                            ) =>
                              handleBlur(
                                event,
                                'text',
                                'author name',
                                setAuthorError,
                                setAuthorHelperText
                              )
                            }
                          /> */}
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
                            }) => (
                              <TextField
                                id={name}
                                ref={ref}
                                value={value}
                                fullWidth
                                label="Brand"
                                required
                                helperText={brandHelperText}
                                error={brandError}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                            )}
                          />
                          {/* <TextField
                            fullWidth
                            id="brand"
                            name="brand"
                            label="Brand"
                            required
                            helperText={brandHelperText}
                            error={brandError}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(
                                event,
                                'text',
                                'brand name',
                                setBrandError,
                                setBrandHelperText
                              )
                            }
                            onFocus={(
                              event: React.FocusEvent<HTMLInputElement>
                            ) =>
                              handleFocus(
                                event,
                                'text',
                                'brand name',
                                setBrandError,
                                setBrandHelperText
                              )
                            }
                            onBlur={(
                              event: React.FocusEvent<HTMLInputElement>
                            ) =>
                              handleBlur(
                                event,
                                'text',
                                'brand name',
                                setBrandError,
                                setBrandHelperText
                              )
                            }
                          /> */}
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
                      }) => (
                        <TextField
                          id={name}
                          ref={ref}
                          value={value}
                          fullWidth
                          label="Image Link"
                          required
                          helperText={imageHelperText}
                          error={imageError}
                          onChange={onChange} // send value to hook form
                          onBlur={onBlur} // notify when input is touched/blur
                        />
                      )}
                    />
                    {/* <TextField
                      fullWidth
                      id="image-url"
                      name="image-url"
                      label="Image Link"
                      required
                      helperText={imageHelperText}
                      error={imageError}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                          event,
                          '',
                          'image link',
                          setImageError,
                          setImageHelperText
                        )
                      }
                      onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleFocus(
                          event,
                          '',
                          'image link',
                          setImageError,
                          setImageHelperText
                        )
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          event,
                          '',
                          'image link',
                          setImageError,
                          setImageHelperText
                        )
                      }
                    /> */}
                    <Controller
                      control={control}
                      name="description"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
                        <TextField
                          id={name}
                          ref={ref}
                          value={value}
                          label="Description"
                          fullWidth
                          required
                          helperText={descriptionHelperText}
                          error={descriptionError}
                          multiline
                          rows={3}
                          onChange={onChange} // send value to hook form
                          onBlur={onBlur} // notify when input is touched/blur
                        />
                      )}
                    />
                    {/* <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      required
                      helperText={descriptionHelperText}
                      error={descriptionError}
                      multiline
                      rows={3}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                          event,
                          'text',
                          `${category} description`,
                          setDescriptionError,
                          setDescriptionHelperText
                        )
                      }
                      onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleFocus(
                          event,
                          'text',
                          `${category} description`,
                          setDescriptionError,
                          setDescriptionHelperText
                        )
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          event,
                          'text',
                          `${category} description`,
                          setDescriptionError,
                          setDescriptionHelperText
                        )
                      }
                    /> */}
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
                        }) => (
                          <TextField
                            id={name}
                            ref={ref}
                            value={value}
                            fullWidth
                            select
                            required
                            label={`Select ${category
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')} condition`}
                            helperText={`Please select ${category} condition`}
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
                      {/* <TextField
                        fullWidth
                        id="item-condition"
                        name="item-condition"
                        select
                        required
                        value={itemCondition}
                        label={`Select ${category
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')} condition`}
                        helperText={`Please select ${category} condition`}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setItemCondition(event.target.value)
                          const { value, name } = event.target
                          setFormValues({
                            ...formValues,
                            [name]: value,
                          })
                        }}
                      >
                        {category &&
                          categories.map((option) =>
                            option.value === category
                              ? Object.entries(option.conditionTextValue)
                                  .reverse()
                                  .map(([key, value]) => (
                                    <MenuItem key={key} value={key}>
                                      {value}
                                    </MenuItem>
                                  ))
                              : null
                          )}
                      </TextField> */}
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Controller
                        control={control}
                        name="max-loan-period"
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                        }) => (
                          <TextField
                            id={name}
                            ref={ref}
                            value={value}
                            label="Max loan period"
                            required
                            fullWidth
                            inputProps={{
                              inputMode: 'numeric',
                            }}
                            helperText={maxPeriodHelperText}
                            error={maxPeriodError}
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          />
                        )}
                      />

                      {/* <TextField
                        id="max-loan-period"
                        name="max-loan-period"
                        label="Max loan period"
                        required
                        fullWidth
                        inputProps={{
                          inputMode: 'numeric',
                        }}
                        helperText={maxPeriodHelperText}
                        error={maxPeriodError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            '',
                            'max loan period',
                            setMaxPeriodError,
                            setMaxPeriodHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            '',
                            'max loan period',
                            setMaxPeriodError,
                            setMaxPeriodHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            '',
                            'max loan period',
                            setMaxPeriodError,
                            setMaxPeriodHelperText
                          )
                        }
                      /> */}
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
                      {`${category
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
                          }) => (
                            <TextField
                              id={name}
                              ref={ref}
                              value={value}
                              fullWidth
                              label="City"
                              required
                              type="text"
                              helperText={cityHelperText}
                              error={cityError}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                        {/* <TextField
                          fullWidth
                          id="city"
                          name="city"
                          label="City"
                          required
                          type="text"
                          helperText={cityHelperText}
                          error={cityError}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                              event,
                              'text',
                              'city',
                              setCityError,
                              setCityHelperText
                            )
                          }
                          onFocus={(
                            event: React.FocusEvent<HTMLInputElement>
                          ) =>
                            handleFocus(
                              event,
                              'text',
                              'city',
                              setCityError,
                              setCityHelperText
                            )
                          }
                          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              event,
                              'text',
                              'city',
                              setCityError,
                              setCityHelperText
                            )
                          }
                        /> */}
                      </Grid>
                      <Grid item xs={20} sm={10} md={6}>
                        <Controller
                          control={control}
                          name="street-name"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                          }) => (
                            <TextField
                              id={name}
                              ref={ref}
                              value={value}
                              fullWidth
                              label="Street Name"
                              required
                              type="text"
                              helperText={streetNameHelperText}
                              error={streetNameError}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                        {/* <TextField
                          fullWidth
                          id="street-name"
                          name="street-name"
                          label="Street Name"
                          required
                          type="text"
                          helperText={streetNameHelperText}
                          error={streetNameError}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                              event,
                              'text',
                              'street name',
                              setStreetNameError,
                              setStreetNameHelperText
                            )
                          }
                          onFocus={(
                            event: React.FocusEvent<HTMLInputElement>
                          ) =>
                            handleFocus(
                              event,
                              'text',
                              'street name',
                              setStreetNameError,
                              setStreetNameHelperText
                            )
                          }
                          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              event,
                              'text',
                              'street name',
                              setStreetNameError,
                              setStreetNameHelperText
                            )
                          }
                        /> */}
                      </Grid>
                      <Grid item xs={20} sm={10} md={4}>
                        <Controller
                          control={control}
                          name="street-number"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                          }) => (
                            <TextField
                              id={name}
                              ref={ref}
                              value={value}
                              fullWidth
                              label="St. Number"
                              required
                              inputProps={{
                                inputMode: 'numeric',
                              }}
                              helperText={streetNumHelperText}
                              error={streetNumError}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                        {/* <TextField
                          fullWidth
                          id="street-number"
                          name="street-number"
                          label="St. Number"
                          required
                          inputProps={{
                            inputMode: 'numeric',
                          }}
                          helperText={streetNumHelperText}
                          error={streetNumError}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                              event,
                              '',
                              'street number',
                              setStreetNumError,
                              setStreetNumHelperText
                            )
                          }
                          onFocus={(
                            event: React.FocusEvent<HTMLInputElement>
                          ) =>
                            handleFocus(
                              event,
                              '',
                              'street number',
                              setStreetNumError,
                              setStreetNumHelperText
                            )
                          }
                          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              event,
                              '',
                              'street number',
                              setStreetNumError,
                              setStreetNumHelperText
                            )
                          }
                        /> */}
                      </Grid>
                      <Grid item xs={20} sm={10} md={5}>
                        <Controller
                          control={control}
                          name="zip-code"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                          }) => (
                            <TextField
                              id={name}
                              ref={ref}
                              value={value}
                              fullWidth
                              label="Zip Code"
                              inputProps={{
                                inputMode: 'numeric',
                              }}
                              helperText={zipCodeHelperText}
                              error={zipCodeError}
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                        {/* <TextField
                          fullWidth
                          id="zip-code"
                          name="zip-code"
                          label="Zip Code"
                          inputProps={{
                            inputMode: 'numeric',
                          }}
                          helperText={zipCodeHelperText}
                          error={zipCodeError}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                              event,
                              '',
                              'zip code',
                              setZipCodeError,
                              setZipCodeHelperText
                            )
                          }
                          onFocus={(
                            event: React.FocusEvent<HTMLInputElement>
                          ) =>
                            handleFocus(
                              event,
                              '',
                              'zip code',
                              setZipCodeError,
                              setZipCodeHelperText
                            )
                          }
                          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              event,
                              '',
                              'zip code',
                              setZipCodeError,
                              setZipCodeHelperText
                            )
                          }
                        /> */}
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </>
          )}
          {true ? (
            <Tooltip
              followCursor
              title={
                allErrorsFalse
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

export default ItemPost
