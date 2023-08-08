'use client'

import ItemRequestForm from '@/components/forms/itemRequestForm/ItemRequestForm'
import EmailIcon from '@mui/icons-material/Email'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
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
  const [openItemRequestForm, setOpenItemRequestForm] = useState(false)
  const handleOpenModal = () => setOpenItemRequestForm(true)
  const handleCloseModal = () => setOpenItemRequestForm(false)

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
        <EventAvailableIcon fontSize="large" color="success" />
        <Typography>זמין להשאלה</Typography>
      </Box>
      <Tooltip
        title={status === 'authenticated' ? '' : 'Log in to request the item'}
      >
        <span>
          <Button
            fullWidth
            variant="outlined"
            color={'primary'}
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
              <EmailIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: '0.9rem',
                }}
              >
                בקש פריט
              </Typography>
            </Box>
          </Button>
        </span>
      </Tooltip>
      <ItemRequestForm
        label={''}
        openModal={openItemRequestForm}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default ItemRequestButton
