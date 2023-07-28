'use client'

import ItemRequestForm from '@/components/itemRequestForm/ItemRequestForm'
import { Button } from '@mui/material'
import { useState } from 'react'

export interface IItemRequestButton {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemRequestButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemRequestButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ItemRequestButton: React.FC<IItemRequestButton> = ({
  primary = false,
  label,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <>
      <Button onClick={handleOpen}>בקש פריט</Button>
      <ItemRequestForm label={''} openModal={openModal} handleClose={handleClose} />
    </>
  )
}

export default ItemRequestButton
