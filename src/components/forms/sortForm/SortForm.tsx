'use client'

import FilterListIcon from '@mui/icons-material/FilterList'
import { Icon, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useLocale } from 'next-intl'
import * as React from 'react'
import { Controller } from 'react-hook-form'
import SortIcon from '@mui/icons-material/Sort'

export interface ISortForm {
  options: object[]
  control: any
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SortForm be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SortForm contents
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

const SortForm: React.FC<ISortForm> = ({
  primary = false,
  label,
  control,
  options,
  ...props
}) => {
  const locale = useLocale()
  const [cardStatus, setCardStatus] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof cardStatus>) => {
    const {
      target: { value },
    } = event
    setCardStatus(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

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
        name="category"
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState,
        }) => (
          <FormControl
            sx={{
              width: '220px',
            }}
            variant="standard"
          >
            <Select
              variant="standard"
              sx={{
                '& .MuiSelect-root': {
                  padding: '0',
                  margin: '0',
                },
              }}
              size="small"
              inputRef={ref}
              // value={value}
              // onChange={onChange}
              onBlur={onBlur}
              displayEmpty
              input={<OutlinedInput />}
              value={cardStatus}
              onChange={handleChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
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
                      <Typography variant="body2">options</Typography>
                      <SortIcon />
                    </Box>
                  )
                }

                return selected.join(', ')
              }}
              MenuProps={MenuProps}
            >
              {options.map((option: any) => (
                <MenuItem
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    '&:hover': {
                      '& .checkbox-hidden': {
                        display: 'flex',
                      },
                      // '& .icon-hidden': {
                      //   display: 'none',
                      // },
                    },
                  }}
                  key={option.label}
                  value={option.label}
                >
                  {/* <Checkbox
                    size="small"
                    className="checkbox-hidden"
                    sx={{
                      p: 0,
                      paddingInlineEnd: 0.5,
                      display: 'none',
                    }}
                    checked={cardStatus.indexOf(option.label) > -1}
                  /> */}
                  <Icon
                    className="icon-hidden"
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
    // <Box>
    //   <Button
    //     id="demo-customized-button"
    //     aria-controls={open ? 'demo-customized-menu' : undefined}
    //     aria-haspopup="true"
    //     aria-expanded={open ? 'true' : undefined}
    //     disableElevation
    //     onClick={handleClick}
    //     endIcon={<KeyboardArrowDownIcon />}
    //     size="small"
    //     sx={{
    //       borderColor: theme.palette.primary.main,
    //       borderStyle: 'solid',
    //       borderWidth: 1,
    //       padding: '4px 8px',
    //       maxWidth: 'max-content',
    //     }}
    //   >
    //     Options
    //   </Button>
    //   <Menu
    //     dir="ltr"
    //     anchorEl={anchorEl}
    //     id="filter-toolbar-menu"
    //     MenuListProps={{
    //       'aria-labelledby': 'filter-toolbar-menu',
    //     }}
    //     open={open}
    //     onClose={handleClose}
    //     transformOrigin={{
    //       horizontal: locale === 'he' ? 'right' : 'left',
    //       vertical: 'top',
    //     }}
    //     anchorOrigin={{
    //       horizontal: locale === 'he' ? 'right' : 'left',
    //       vertical: 'bottom',
    //     }}
    //     sx={{
    //       '& .MuiPaper-root': {
    //         borderRadius: 2,
    //         marginTop: theme.spacing(1),
    //         minWidth: 180,
    //         color:
    //           theme.palette.mode === 'light'
    //             ? 'rgb(55, 65, 81)'
    //             : theme.palette.grey[300],
    //         boxShadow:
    //           'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    //         '& .MuiMenu-list': {
    //           padding: '4px 0',
    //         },
    //         '& .MuiMenuItem-root': {
    //           '& .MuiSvgIcon-root': {
    //             fontSize: 18,
    //             color: theme.palette.text.secondary,
    //             marginRight: theme.spacing(1.5),
    //           },
    //           '&:active': {
    //             backgroundColor: alpha(
    //               theme.palette.primary.main,
    //               theme.palette.action.selectedOpacity
    //             ),
    //           },
    //         },
    //       },
    //       // '& .MuiMenu-paper': {
    //       //   width: '1000px',
    //       //   maxWidth: 'max-content',
    //       //   minWidth: 'min-content',
    //       //   borderRadius: 3,
    //       //   boxShadow: 4,
    //       // },
    //     }}
    //   >
    //     {options.map((option: any, index: number) => (
    //       <Box key={index}>
    //         <MenuItem
    //           onClick={handleClose}
    //           sx={{
    //             '&:hover': {
    //               backgroundColor: theme.palette.primary.light,
    //             },
    //             display: 'flex',
    //             gap: '1rem',
    //           }}
    //         >
    //           {option.icon}
    //           {option.label}
    //         </MenuItem>
    //         {index % 2 === 1 && index < options.length - 1 && <Divider />}
    //       </Box>
    //     ))}
    //   </Menu>
    // </Box>
  )
}

export default SortForm
