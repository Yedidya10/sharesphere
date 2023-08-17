'use client'

import ItemEditForm from '@/components/forms/itemEditForm/ItemEditForm'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'

export interface IItemEditButton {
  formProps?: any
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemEditButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemEditButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ItemEditButton: React.FC<IItemEditButton> = ({
  primary = false,
  label,
  formProps,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <ItemEditForm
        label={''}
        openModal={openModal}
        handleClose={handleClose}
        formProps={formProps}
      />
    </>
  )
}

export default ItemEditButton
