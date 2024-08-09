'use client'

import categories from '@/utils/categories/categories'
import { IAddItemFormValues } from '@/utils/types/formValues'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Control, Controller, UseFormWatch } from 'react-hook-form'

export interface ISecondaryCategoryInput {
  control: Control<IAddItemFormValues, any>
  watch: UseFormWatch<IAddItemFormValues>
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SecondaryCategoryInput be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SecondaryCategoryInput contents
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

const SecondaryCategoryInput: React.FC<ISecondaryCategoryInput> = ({
  primary = false,
  label,
  control,
  watch,
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
            fieldState.isDirty ? '' : 'Please select item sub-category'
          }
          error={!!fieldState.error}
          onChange={onChange}
          onBlur={onBlur}
        >
          {watch('mainCategory') &&
            categories
              .find((category) => category.value === watch('mainCategory'))
              ?.subCategories?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </TextField>
      )}
    />
  )
}

export default SecondaryCategoryInput
