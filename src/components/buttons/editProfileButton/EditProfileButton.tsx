'use client'

import EditProfileForm from '@/components/forms/editProfileForm/EditProfileForm'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'

export interface IEditProfileButton {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the EditProfileButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * EditProfileButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const EditProfileButton: React.FC<IEditProfileButton> = ({
  primary = false,
  label,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => setOpenModal(false)

  return (
    <>
      <Button
        sx={{
          display: { xs: 'none', xsm: 'flex' },
          alignItems: 'start',
          height: 'max-content',
          gap: 1,
        }}
        onClick={() => setOpenModal(true)}
      >
        <EditIcon />
        Edit Profile
      </Button>
      <EditProfileForm
        openModal={openModal}
        handleClose={handleClose}
        label={''}
      />

      <Tooltip
        sx={{ display: { xs: 'block', xsm: 'none' } }}
        title="Edit Profile"
      >
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default EditProfileButton
