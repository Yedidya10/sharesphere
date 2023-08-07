'use client'

import ItemPost from '@/components/forms/itemPostForm/ItemPostForm'
import { Button } from '@mui/material'
import { useState } from 'react'

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
      <Button onClick={handleOpen}>פרסם פריט להשאלה</Button>
      <ItemPost label={''} openModal={openModal} handleClose={handleClose} />
    </>
  )
}

export default ItemPostButton
