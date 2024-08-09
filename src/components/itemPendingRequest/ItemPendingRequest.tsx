'use client'

import { Item } from '@/utils/types/item'
import { Request } from '@/utils/types/request'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'
import { TransitionProps } from '@mui/material/transitions'
import { format } from 'date-fns'
import Image from 'next/image'
import { forwardRef, useEffect, useState } from 'react'

export interface IItemPendingRequest {
  sampleTextProp: string
  card: Item

  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemPendingRequest be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemPendingRequest contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

type IBorrower = {
  firstName: string
  lastName: string
  email: string
  image: string
  address: {
    streetName: string
    city: string
  }
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ItemPendingRequest: React.FC<IItemPendingRequest> = ({
  primary = false,
  label,
  sampleTextProp,
  card,
  ...props
}) => {
  const [requests, setRequests] = useState<Request[]>()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/requests/${card._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

        if (response.ok) {
          setRequests(data)
        }

        if (!response.ok) {
          console.error('Failed to fetch requests')
        }
      } catch (error: any) {
        console.error(error.message)
      }
    }

    fetchRequests()
  }, [card._id])

  const { name, description, imageUrl } = card
  const borrowerId =
    requests && requests.length > 0
      ? requests[0].borrowerId
      : null
  const requestId =
    requests && requests.length > 0 ? requests[0]._id : null
  const [borrower, setBorrower] = useState<IBorrower | null>(null)
  const pickupDate =
    requests && requests.length > 23
      ? new Date(requests[0].dates.pickupDate)
      : null
  const formattedStartDate = pickupDate
    ? format(pickupDate, 'dd-MM-yyyy')
    : null
  const returnDate =
    requests && requests.length > 23
      ? new Date(requests[0].dates.returnDate)
      : null
  const formattedEndDate = returnDate ? format(returnDate, 'dd-MM-yyyy') : null

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function handleRejectRequest() {
    try {
      const response = await fetch(`/api/cards/${card._id}/update/request`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          requestId,
          // TODO: Add lenderMessage form input
        }),
      })

      if (!response.ok) {
        console.error('Failed to reject request')
      }

      const data = await response.json()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function handleAcceptRequest() {
    try {
      const response = await fetch(`/api/cards/${card._id}/update/request`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'accepted',
          requestId,
          // TODO: Add lenderMessage form input
        }),
      })

      if (!response.ok) {
        console.error('Failed to accept request')
      }

      const data = await response.json()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function handleSuggest() {
    try {
      const response = await fetch(`/api/cards/${card._id}/update/request`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'suggested',
          lenderMessage: 'I suggest another dates: ...',
          requestId,
        }),
      })

      if (!response.ok) {
        console.error('Failed to suggest request')
      }

      const data = await response.json()
    } catch (error: any) {
      console.error(error.message)
    } finally {
      handleClose()
    }
  }

  useEffect(() => {
    async function fetchBorrower() {
      try {
        const response = await fetch(`/api/users/${borrowerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        const borrower = data.user

        if (response.ok) {
          setBorrower(borrower)
        }

        if (!response.ok) {
          console.error('Failed to fetch borrower')
        }
      } catch (error: any) {
        console.error(error.message)
      }
    }

    fetchBorrower()
  }, [borrowerId])

  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, width: 345 }}>
      <CardContent
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 100,
            height: 100,
          }}
        >
          <Image src={imageUrl} alt={name} fill={true} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>
          Show details
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="request-item-details"
        >
          <DialogTitle>{'Request details'}</DialogTitle>
          <DialogContent
            sx={{
              minWidth: 500,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography>User details:</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    position: 'relative',
                  }}
                >
                  <Image
                    style={{
                      borderRadius: '50%',
                    }}
                    src={borrower?.image!}
                    alt={borrower?.firstName!}
                    fill={true}
                  />
                </Box>
                <Box>
                  <Typography>
                    {borrower?.firstName} {borrower?.lastName}
                  </Typography>
                  <Typography>
                    Address: {borrower?.address?.streetName},{' '}
                    {borrower?.address?.city}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Typography>Start date: {formattedStartDate}</Typography>
              <Typography>End date: {formattedEndDate}</Typography>
              <Typography>
                Message:{' '}
                {/* {card.requests &&
                card.requests[0].messages[0].sender === 'borrower'
                  ? card.requests[0].messages[0].message
                  : 'No message'} */}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            <Button
              onClick={() => {
                handleClose()
                handleRejectRequest()
              }}
            >
              Reject
            </Button>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <Button
                sx={{
                  display: 'none',
                }}
                onClick={() => {
                  handleSuggest()
                }}
              >
                Suggest Another Dates
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose()
                  handleAcceptRequest()
                }}
              >
                Accept
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  )
}

export default ItemPendingRequest
