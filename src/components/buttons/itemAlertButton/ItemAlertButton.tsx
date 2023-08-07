'use client'

import ItemAlertForm from '@/components/forms/itemAlertForm/ItemAlertForm'
import AddAlertIcon from '@mui/icons-material/AddAlert'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export interface IItemAlertButton {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemAlertButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemAlertButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ItemAlertButton: React.FC<IItemAlertButton> = ({
  primary = false,
  label,
}) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const { data: session, status } = useSession()

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e0e0e0',
          padding: '10px',
        }}
      >
        <EventBusyIcon fontSize="large" color="disabled" />
        <Typography>לא זמין להשאלה</Typography>
      </Box>
      <Tooltip
        title={
          status === 'authenticated'
            ? 'Sign up to be notified when the item is available'
            : 'Log in to sign up for an alert'
        }
      >
        <span>
          <Button
            fullWidth
            variant="outlined"
            color={'warning'}
            disabled={status === 'unauthenticated'}
            onClick={handleOpenModal}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                paddingBlock: '5px',
              }}
            >
              <AddAlertIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: '0.9rem',
                }}
              >
                קבל התראה
              </Typography>
            </Box>
          </Button>
        </span>
      </Tooltip>
      <ItemAlertForm
        label={''}
        openModal={openModal}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default ItemAlertButton
