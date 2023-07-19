'use client'

import useSWR, { Fetcher } from 'swr'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ItemPost.module.scss'
import validateISBN from '../../utils/func/validateISBN'
import validateBarcode from '@/utils/func/validateBarcode'
import SpringModal from '../springModal/SpringModal'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import { BiBarcodeReader } from 'react-icons/bi'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import { type } from 'os'
import React from 'react'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

interface Card {
  itemName: string
  author: string
  brand?: string
  publisher?: string
  description: string
  imageUrl: string
  imageAlt: string
  isbn?: number
  danacode?: number
  barcode?: number
  condition: number
  maxLoanPeriod: number
  streetName: string
  streetNumber: number
  city: string
  zipCode: number
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
    value: 'board game',
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

const ItemPost: React.FC<IItemPost> = ({
  primary = false,
  label,
  openModal,
  handleClose,
}) => {
  const [cardData, setCardData] = useState<Card | null>(null)
  const [useUserAddress, setUseUserAddress] = useState<boolean>(false)

  const [category, setCategory] = useState<string | null>(null)
  const [itemCondition, setItemCondition] = useState<string | null>(null)
  const [nameError, setNameError] = useState<boolean>(false)
  const [authorError, setAuthorError] = useState<boolean>(false)
  const [brandError, setBrandError] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [isbnError, setIsbnError] = useState<boolean>(false)
  const [danacodeError, setDanacodeError] = useState<boolean>(false)
  const [maxPeriodError, setMaxPeriodError] = useState<boolean>(false)
  const [cityError, setCityError] = useState<boolean>(false)
  const [streetNumError, setStreetNumError] = useState<boolean>(false)
  const [streetNameError, setStreetNameError] = useState<boolean>(false)
  const [zipCodeError, setZipCodeError] = useState<boolean>(false)

  const [nameHelperText, setNameHelperText] = useState<string>(
    `Please enter the ${category} name`
  )
  const [authorHelperText, setAuthorHelperText] = useState<string>(
    'Please enter the author name'
  )
  const [brandHelperText, setBrandHelperText] = useState<string>(
    'Please enter the brand name'
  )
  const [imageHelperText, setImageHelperText] = useState<string>(
    'Please enter image link'
  )
  const [descriptionHelperText, setDescriptionHelperText] = useState<string>(
    `Please enter the ${category} description`
  )
  const [isbnHelperText, setIsbnHelperText] = useState<string>(
    `Please enter the isbn number`
  )
  const [danacodeHelperText, setDanacodeHelperText] = useState<string>(
    `Please enter the isbn number`
  )
  const [maxPeriodHelperText, setMaxPeriodHelperText] = useState<string>(
    `Please enter max loan period number`
  )
  const [cityHelperText, setCityHelperText] = useState<string>(
    `Please enter your city`
  )
  const [streetNameHelperText, setStreetNameHelperText] = useState<string>(
    `Please enter max loan period number`
  )
  const [streetNumHelperText, setStreetNumHelperText] = useState<string>(
    `Please enter max loan period number`
  )
  const [zipCodeHelperText, setZipCodeHelperText] = useState<string>(
    `Please enter max loan period number`
  )


  useEffect(() => {
    setNameHelperText(`Please enter the ${category} name`)
    setDescriptionHelperText(`Please enter the ${category} description`)
  }, [category])

  const regexTextPattern = /^[A-Za-z]+$/
  const regexImageUrlPattern =
    /https?:\/\/[^\s\/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)/m

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldId: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setHelperText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value

    if (inputValue.trim() === '') {
      setError(true)
      return setHelperText('This field is required.')
    }

    if (inputValue.trim() !== '') {
      if (fieldId !== 'image link' && !regexTextPattern.test(inputValue)) {
        setError(true)
        return setHelperText('Please enter a valid text')
      }

      if (fieldId === 'image link' && !regexImageUrlPattern.test(inputValue)) {
        setError(true)
        return setHelperText('Please enter valid url link')
      }
    }

    if (fieldId !== 'image link' && regexTextPattern.test(inputValue)) {
      setError(false)
      setHelperText(
        `Please enter the ${
          fieldId === 'item-name' ? `${category} name` : `${fieldId}`
        }`
      )
    }

    if (fieldId === 'image link' && regexImageUrlPattern.test(inputValue)) {
      setError(false)
      return setHelperText('Please enter image link')
    }
  }

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement>,
    fieldId: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setHelperText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value

    if (inputValue.trim() === '') {
      return
    }

    if (inputValue.trim() !== '') {
      if (fieldId !== 'image link' && !regexTextPattern.test(inputValue)) {
        setError(true)
        return setHelperText('Please enter a valid text')
      }

      if (fieldId === 'image link' && !regexImageUrlPattern.test(inputValue)) {
        setError(true)
        return setHelperText('Please enter valid url link')
      }

      if (fieldId !== 'image link' && regexTextPattern.test(inputValue)) {
        setError(false)
        setHelperText(
          `Please enter the ${
            fieldId === 'item-name' ? `${category} name` : `${fieldId}`
          }`
        )
      }

      if (fieldId === 'image link' && regexImageUrlPattern.test(inputValue)) {
        setError(false)
        return setHelperText('Please enter image link')
      }
    }
  }

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    fieldId: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setHelperText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value

    if (inputValue.trim() === '') {
      setError(false)
      return setHelperText(
        `Please enter the ${
          fieldId === 'item-name' ? `${category} name` : `${fieldId}`
        }`
      )
    }

    if (inputValue.trim() !== '') {
      if (fieldId !== 'image link' && !regexTextPattern.test(inputValue)) {
        setError(true)
        return setHelperText('Please enter a valid text')
      }

      if (fieldId === 'image link' && !regexImageUrlPattern.test(inputValue)) {
        setError(true)
        return setHelperText('Please enter valid url link')
      }

      if (fieldId !== 'image link' && regexTextPattern.test(inputValue)) {
        setError(false)
        setHelperText(
          `Please enter the ${
            fieldId === 'item-name' ? `${category} name` : `${fieldId}`
          }`
        )
      }

      if (fieldId === 'image link' && regexImageUrlPattern.test(inputValue)) {
        setError(false)
        return setHelperText('Please enter image link')
      }
    }
  }

  const handleClickBarcodeReader = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(event)
  }

  const [user, setUser] = useState({
    streetName: 'David Hameleh',
    streetNumber: '1',
    city: 'Jerusalem',
    zipCode: '1234567',
  })

  const onSubmit = async (data: object) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SpringModal handleClose={handleClose} openModal={openModal} label={''}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <TextField
            fullWidth
            id="category-select"
            select
            required
            value={category}
            label="Select Category"
            helperText="Please select your category"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCategory(event.target.value)
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {category ? (
          <>
            {category === 'book' ? (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ m: 1 }} error={isbnError}>
                      <InputLabel htmlFor="isbn-number">ISBN number</InputLabel>
                      <OutlinedInput
                        id="isbn-number"
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '/^w{10}(?:w{3})?$/',
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="barcode reader button"
                              onClick={handleClickBarcodeReader}
                              edge="end"
                            >
                              <BiBarcodeReader />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="ISBN number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'ISBN number',
                            setIsbnError,
                            setIsbnHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'ISBN number',
                            setIsbnError,
                            setIsbnHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'ISBN number',
                            setIsbnError,
                            setIsbnHelperText
                          )
                        }
                      />
                      <FormHelperText children={isbnHelperText} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ m: 1 }} error={danacodeError}>
                      <InputLabel htmlFor="danacode-number">
                        Danacode number
                      </InputLabel>
                      <OutlinedInput
                        id="danacode-number"
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '/^w{12}$/',
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="barcode reader button"
                              onClick={handleClickBarcodeReader}
                              edge="end"
                            >
                              <BiBarcodeReader />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Danacode number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'danacode number',
                            setDanacodeError,
                            setDanacodeHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'danacode number',
                            setDanacodeError,
                            setDanacodeHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'danacode number',
                            setDanacodeError,
                            setDanacodeHelperText
                          )
                        }
                      />
                      <FormHelperText children={danacodeHelperText} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <></>
            )}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="item-name"
                    label="Name"
                    required
                    helperText={nameHelperText}
                    error={nameError}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        event,
                        'item-name',
                        setNameError,
                        setNameHelperText
                      )
                    }
                    onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                      handleFocus(
                        event,
                        'item-name',
                        setNameError,
                        setNameHelperText
                      )
                    }
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                      handleBlur(
                        event,
                        'item-name',
                        setNameError,
                        setNameHelperText
                      )
                    }
                  />
                </Grid>
                {category === 'book' ? (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="author"
                      label="Author"
                      required
                      helperText={authorHelperText}
                      error={authorError}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                          event,
                          'author name',
                          setAuthorError,
                          setAuthorHelperText
                        )
                      }
                      onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleFocus(
                          event,
                          'author name',
                          setAuthorError,
                          setAuthorHelperText
                        )
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          event,
                          'author name',
                          setAuthorError,
                          setAuthorHelperText
                        )
                      }
                    />
                  </Grid>
                ) : (
                  <></>
                )}
                {category === 'board game' ? (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="brand"
                      label="Brand"
                      required
                      helperText={brandHelperText}
                      error={brandError}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                          event,
                          'brand name',
                          setBrandError,
                          setBrandHelperText
                        )
                      }
                      onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleFocus(
                          event,
                          'brand name',
                          setBrandError,
                          setBrandHelperText
                        )
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          event,
                          'brand name',
                          setBrandError,
                          setBrandHelperText
                        )
                      }
                    />
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
              <TextField
                fullWidth
                id="image"
                label="Image Link"
                required
                helperText={imageHelperText}
                error={imageError}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(
                    event,
                    'image link',
                    setImageError,
                    setImageHelperText
                  )
                }
                onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                  handleFocus(
                    event,
                    'image link',
                    setImageError,
                    setImageHelperText
                  )
                }
                onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                  handleBlur(
                    event,
                    'image link',
                    setImageError,
                    setImageHelperText
                  )
                }
              />
              <Box>
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  required
                  helperText={descriptionHelperText}
                  error={descriptionError}
                  multiline
                  rows={3}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(
                      event,
                      `${category} description`,
                      setDescriptionError,
                      setDescriptionHelperText
                    )
                  }
                  onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                    handleFocus(
                      event,
                      `${category} description`,
                      setDescriptionError,
                      setDescriptionHelperText
                    )
                  }
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                    handleBlur(
                      event,
                      `${category} description`,
                      setDescriptionError,
                      setDescriptionHelperText
                    )
                  }
                />
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                      <TextField
                        fullWidth
                        id="condition-select"
                        select
                        required
                        value={itemCondition}
                        label={`Select ${
                          category.charAt(0).toUpperCase() + category.slice(1)
                        } condition`}
                        helperText={`Please select ${category} condition`}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setItemCondition(event.target.value)
                        }}
                      >
                        {category &&
                          categories.map((option) =>
                            option.value === category
                              ? Object.entries(option.conditionTextValue)
                                  .reverse()
                                  .map(([key, value]) => (
                                    <MenuItem key={key} value={value}>
                                      {value}
                                    </MenuItem>
                                  ))
                              : null
                          )}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        id="max-loan-period"
                        label="Max loan period"
                        required
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText={maxPeriodHelperText}
                        error={maxPeriodError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'max loan period',
                            setMaxPeriodError,
                            setMaxPeriodHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'max loan period',
                            setMaxPeriodError,
                            setMaxPeriodHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'max loan period',
                            setMaxPeriodError,
                            setMaxPeriodHelperText
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Typography>
                    {`${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    } Location:`}
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="Use my current address" />
                  <Grid container spacing={.5} columns={20}>
                    <Grid item xs={20} sm={5} md={10}>
                      <TextField
                        fullWidth
                        id="city"
                        label='City'
                        required
                        type='text'
                        helperText={cityHelperText}
                        error={cityError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'city',
                            setCityError,
                            setCityHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'city',
                            setCityError,
                            setCityHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'city',
                            setCityError,
                            setCityHelperText
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={20} sm={6} md={10}>
                      <TextField
                        fullWidth
                        id="street-name"
                        label='Street'
                        required
                        type='text'
                        helperText={streetNameHelperText}
                        error={streetNameError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'street name',
                            setStreetNameError,
                            setStreetNameHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'street name',
                            setStreetNameError,
                            setStreetNameHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'street name',
                            setStreetNameError,
                            setStreetNameHelperText
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={20} sm={4} md={10}>
                      <TextField
                        fullWidth
                        id="street-number"
                        label='Number'
                        required
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText={streetNumHelperText}
                        error={streetNumError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'street number',
                            setStreetNumError,
                            setStreetNumHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'street number',
                            setStreetNumError,
                            setStreetNumHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'street number',
                            setStreetNumError,
                            setStreetNumHelperText
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={20} sm={5} md={10}>
                      <TextField
                        fullWidth
                        id="zip-code"
                        label='Zip Code'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText={zipCodeHelperText}
                        error={zipCodeError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            event,
                            'zip code',
                            setZipCodeError,
                            setZipCodeHelperText
                          )
                        }
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleFocus(
                            event,
                            'zip code',
                            setZipCodeError,
                            setZipCodeHelperText
                          )
                        }
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                          handleBlur(
                            event,
                            'zip code',
                            setZipCodeError,
                            setZipCodeHelperText
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="submit"
          value="Submit"
          disabled={Object.keys(errors).length > 0}
          className={styles.submitButton}
        />
      </form>
    </SpringModal>
  )
}

export default ItemPost
