'use client'

import { NextLinkComposed } from '@/components/mui/Link'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

export interface IItemPostButton {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemPostButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemPostButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ItemPostButton: React.FC<IItemPostButton> = ({
  primary = false,
  label,
}) => {
  return (
    <>
      <Button
        component={NextLinkComposed}
        to="/add-item"
        sx={{
          display: { xs: 'none', xsm: 'flex' },
          gap: 1,
        }}
      >
        <PostAddIcon />
        Add Item
      </Button>
      <Tooltip sx={{ display: { xs: 'block', xsm: 'none' } }} title="Add Item">
        <IconButton component={NextLinkComposed} to="/add-item">
          <PostAddIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default ItemPostButton
