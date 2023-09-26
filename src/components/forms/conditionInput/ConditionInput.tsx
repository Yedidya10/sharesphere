'use client'

import categories from '@/utils/categories/categories'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import TextField from '@mui/material/TextField'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Control, Controller, UseFormWatch } from 'react-hook-form'
import { AddItemFormValues } from '@/utils/types/FormValues'

export interface IConditionInput {
  control: Control<AddItemFormValues, any>
  watch: UseFormWatch<AddItemFormValues>
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ConditionInput be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ConditionInput contents
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

const ConditionInput: React.FC<IConditionInput> = ({
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
      name="itemCondition"
      rules={{
        required: `${(watch('mainCategory') as string)
          .split(' ')
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
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
          label={`${(watch('mainCategory') as string)
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')} condition`}
          helperText={
            fieldState.error
              ? fieldState.error.message
              : `Please select ${watch('mainCategory')} condition`
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
  )
}

export default ConditionInput
