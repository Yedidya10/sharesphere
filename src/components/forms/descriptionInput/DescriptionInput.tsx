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

export interface IDescriptionInput {
  control: Control<AddItemFormValues, any>
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
   * How large should the DescriptionInput be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * DescriptionInput contents
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

const DescriptionInput: React.FC<IDescriptionInput> = ({
  primary = false,
  label,
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

  return (
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
        <FormControl fullWidth required error={!!fieldState.error}>
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
  )
}

export default DescriptionInput
