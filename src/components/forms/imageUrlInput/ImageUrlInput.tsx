'use client'

import { regexImageUrlPattern } from '@/utils/regexPatterns'
import { AddItemFormValues } from '@/utils/types/FormValues'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React from 'react'
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetError,
  UseFormWatch,
} from 'react-hook-form'

export interface IImageUrlInput {
  control: Control<AddItemFormValues, any>
  setError: UseFormSetError<AddItemFormValues>
  clearErrors: UseFormClearErrors<AddItemFormValues>
  watch?: UseFormWatch<AddItemFormValues>
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ImageUrlInput be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ImageUrlInput contents
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

const ImageUrlInput: React.FC<IImageUrlInput> = ({
  primary = false,
  label,
  setError,
  clearErrors,
  control,
}) => {
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

  const isURL = (str: string) => {
    const pattern =
      /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(:\d{1,5})?([/?#].*)?$/
    return pattern.test(str)
  }

  const validateImageUrl = (url: string) => {
    const splitUrl = url.split('.')
    const lastSegment = splitUrl[splitUrl.length - 1]
    const secondLastSegment = splitUrl[splitUrl.length - 2]

    clearErrors('imageUrl') // Clear previous errors

    if (!isURL(url)) {
      setError('imageUrl', {
        type: 'manual',
        message: 'Please enter a valid URL',
      })
      return false
    }

    if (lastSegment.toLowerCase() === secondLastSegment.toLowerCase()) {
      setError('imageUrl', {
        type: 'manual',
        message: 'The URL contains a duplicate file extension',
      })
      return false
    }

    if (!regexImageUrlPattern.test(url)) {
      if (!url.startsWith('http')) {
        setError('imageUrl', {
          type: 'manual',
          message: 'URL must start with http:// or https://',
        })
      }
      if (!/\.(jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)$/i.test(url)) {
        setError('imageUrl', {
          type: 'manual',
          message: 'Missing image file extension',
        })
      }
      if (
        !/\.(jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)$/i.test(url.split('?')[0])
      ) {
        setError('imageUrl', {
          type: 'manual',
          message: 'Characters found after file extension',
        })
      }
      return false
    }
    return true
  }

  return (
    <Controller
      control={control}
      name="imageUrl"
      rules={{
        required: 'Image url is required',
        validate: (value) => validateImageUrl(value),
      }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState,
      }) => (
        <FormControl fullWidth required error={!!fieldState.error}>
          <TextField
            id={name}
            required
            inputRef={ref}
            value={value}
            label="Image Url"
            fullWidth
            onChange={onChange}
            onBlur={onBlur}
          />
          <FormHelperText>
            {(function () {
              if (fieldState.error) {
                return fieldState.error.message
              }
              if (!fieldState.isDirty) {
                return 'Please enter a valid image url'
              }
              if (!fieldState.invalid) {
                return getValidText()
              }
            })()}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default ImageUrlInput
