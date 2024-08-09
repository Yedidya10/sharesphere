'use client'

import FilterListIcon from '@mui/icons-material/FilterList'
import { Icon, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import { Controller } from 'react-hook-form'
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'

export interface IPostingStatusFilter {
  control: any
  filterType: string
  filterName: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the PostingStatusFilter be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * PostingStatusFilter contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const PostingStatusFilter: React.FC<IPostingStatusFilter> = ({
  primary = false,
  label,
  control,
  filterType,
  filterName,
}) => {
  const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const addSpacesBetweenWords = (input: string): string => {
    return input.replace(/([a-z])([A-Z])/g, '$1 $2')
  }

  const isStringAtFinalIndex = (value: string, array: string[]): boolean => {
    // Check if the array is not empty and the last element matches the given word
    return array.length > 0 && array[array.length - 1] === value
  }

  const options = [
    {
      label: 'All',
      value: 'all',
      icon: <FilterListIcon />,
    },
    {
      label: 'Published',
      value: 'published',
      icon: <CheckCircleOutlineIcon />,
    },
    {
      label: 'In Review',
      value: 'inReview',
      icon: <PendingActionsOutlinedIcon />,
    },
    {
      label: 'Draft',
      value: 'draft',
      icon: <DrawOutlinedIcon />,
    },
    {
      label: 'Inactive',
      value: 'inactive',
      icon: <AcUnitOutlinedIcon />,
    },
    {
      label: 'Deleted',
      value: 'deleted',
      icon: <DeleteOutlineIcon />,
    },
  ]

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
      }}
      noValidate
      autoComplete="off"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name={filterType}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState,
        }) => (
          <FormControl
            sx={{
              width: '220px',
            }}
          >
            <InputLabel htmlFor={filterName}>{filterName}</InputLabel>
            <Select
              name={name}
              multiple
              sx={{
                '& .MuiSelect-root': {
                  padding: '0',
                  margin: '0',
                },
              }}
              size="small"
              inputRef={ref}
              value={value}
              onBlur={onBlur}
              input={<OutlinedInput label={filterName} />}
              onChange={(event: SelectChangeEvent<typeof value>) => {
                // Get the selected values as an array
                const selectedValues = event.target.value

                // Check if 'all' is selected recently, if so, filter out all other values
                const isAllRecentlySelected = isStringAtFinalIndex(
                  'all',
                  selectedValues
                )
                if (isAllRecentlySelected) {
                  const updatedValues = selectedValues.filter(
                    (val: string) => val === 'all'
                  )
                  return onChange(updatedValues)
                }

                // Check if 'all' is included in the selected values, if so, filter out 'all'
                const isAllIncluded =
                  selectedValues.includes('all') && selectedValues.length > 1
                if (isAllIncluded) {
                  const updatedValues = selectedValues.filter(
                    (val: string) => val !== 'all'
                  )
                  return onChange(updatedValues)
                }

                // If selected values are all unselected, select 'all'
                const isSelectedValuesEmpty = selectedValues.length === 0
                if (isSelectedValuesEmpty) {
                  const updatedValues = ['all']
                  return onChange(updatedValues)
                }

                // Update the form values
                onChange(selectedValues)
              }}
              renderValue={(selected) => {
                // Check if 'all' is selected and return the styled text
                if (selected.every((value: string) => value === 'all')) {
                  return (
                    <Box
                      sx={{
                        color: 'grey.500',
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2">
                        {selected.map(capitalizeFirstLetter)}
                      </Typography>
                      <FilterListIcon />
                    </Box>
                  )
                }

                // Return the selected values with the first letter capitalized and spaces between words
                return selected
                  .map(capitalizeFirstLetter)
                  .map(addSpacesBetweenWords)
                  .join(', ')
              }}
              MenuProps={MenuProps}
            >
              {options.map((option: any) => (
                <MenuItem
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                  key={option.value}
                  value={option.value}
                >
                  <Icon
                    sx={{
                      display: 'flex',
                    }}
                  >
                    {option.icon}
                  </Icon>
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  )
}

export default PostingStatusFilter
