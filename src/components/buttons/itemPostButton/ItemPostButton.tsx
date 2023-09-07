'use client'

import ItemPostForm from '@/components/forms/itemPostForm/ItemPostForm'
import Button from '@mui/material/Button'
import { useState } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Box from '@mui/material/Box'
import { IconButton, Tooltip } from '@mui/material'

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
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <>
      <Button
        sx={{
          display: { xs: 'none', xsm: 'flex' },
          gap: 1,

        }}
        onClick={handleOpen}
      >
        <PostAddIcon />
        Add Item
      </Button>
      <Tooltip
        sx={{ display: { xs: 'block', xsm: 'none' } }}
        title="פרסם פריט להשאלה"
      >
        <IconButton onClick={handleOpen}>
          <PostAddIcon />
        </IconButton>
      </Tooltip>
      <ItemPostForm
        label={''}
        openModal={openModal}
        handleClose={handleClose}
      />
    </>
  )
}

export default ItemPostButton
