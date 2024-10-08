'use client'

import AddAlertIcon from '@mui/icons-material/AddAlert'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'

export interface IItemAlertButton {
  handleClick?: () => void
  cardId: string
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
  // handleClick,
  cardId,
  label,
}) => {
  const { data: session, status } = useSession()

  const handleClick = async () => {
    try {
      const itemAlert = {
        subscriberId: session?.user?.id,
        alertsRequested: true,
      }
      const res = await fetch(`/api/cards/cardId/${cardId}/update/itemAlert`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemAlert,
        }),
      })

      const json = await res.json()

    } catch (error) {
      console.error(error)
    }
  }

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
            onClick={handleClick}
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
    </>
  )
}

export default ItemAlertButton
