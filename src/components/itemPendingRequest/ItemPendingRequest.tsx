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
import { Notification } from '@/utils/types/notification'
import mongoose from 'mongoose'

export interface IItemPendingRequest {
  sampleTextProp: string
  card: Item
  pendingRequests: Request[]
  setPendingRequests: React.Dispatch<React.SetStateAction<Request[]>>
  onAllRequestsProcessed: (itemId: string) => void
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
  pendingRequests,
  setPendingRequests,
  onAllRequestsProcessed,
  ...props
}) => {
  const [borrowerId, setBorrowerId] = useState<
    mongoose.Schema.Types.ObjectId | undefined
  >(undefined)
  const [requestId, setRequestId] = useState<string | undefined>(undefined)
  const [pickupDate, setPickupDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [formattedStartDate, setFormattedStartDate] = useState<string | null>(
    null
  )
  const [formattedEndDate, setFormattedEndDate] = useState<string | null>(null)
  const [borrower, setBorrower] = useState<IBorrower | null>(null)
  const { name, description, imageUrl } = card
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (pendingRequests.length === 0) {
      onAllRequestsProcessed(card._id!.toString())
    }
  }, [card._id, onAllRequestsProcessed, pendingRequests])

  async function handleRejectRequest() {
    const notification: Notification = {
      user: borrowerId!,
      title: 'Item request rejected',
      message: `Your request for item: ${card.name} has been rejected`,
      image: card.imageUrl,
      status: 'unread',
      invisible: false,
    }

    try {
      const [requestResponse, notificationResponse] = await Promise.all([
        fetch(`/api/requests/requestId/${requestId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'rejected',
            // TODO: Add lenderMessage form input
          }),
        }),

        fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notification),
        }),
      ])

      if (!notificationResponse.ok || !requestResponse.ok) {
        throw new Error('Failed to reject request or post notification')
      }

      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      )
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function handleAcceptRequest() {
    const notification: Notification = {
      user: borrowerId!,
      title: 'Item request accepted',
      message: `Your request for item "${card.name}" has been accepted`,
      image: card.imageUrl,
      status: 'unread',
      invisible: false,
    }

    try {
      const [requestResponse, notificationResponse] = await Promise.all([
        fetch(`/api/requests/requestId/${requestId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'accepted',
            // TODO: Add lenderMessage form input
          }),
        }),
        fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notification),
        }),
      ])

      if (!requestResponse.ok || !notificationResponse.ok) {
        throw new Error('Failed to accept request or post notification')
      }

      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      )
    } catch (error: any) {
      console.error(error.message)
    }
  }

  // async function handleSuggest() {
  //   try {
  //     const response = await fetch(`/api/cards/${card._id}/update/request`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         status: 'suggested',
  //         lenderMessage: 'I suggest another dates: ...',
  //         requestId,
  //       }),
  //     })

  //     if (!response.ok) {
  //       console.error('Failed to suggest request')
  //     }

  //     const data = await response.json()
  //   } catch (error: any) {
  //     console.error(error.message)
  //   } finally {
  //     handleClose()
  //   }
  // }

  useEffect(() => {
    if (pendingRequests && pendingRequests.length > 0) {
      setBorrowerId(pendingRequests[0].borrowerId)
      setRequestId(pendingRequests[0]?._id?.toString())
      setPickupDate(new Date(pendingRequests[0].dates.pickupDate))
      setReturnDate(new Date(pendingRequests[0].dates.returnDate))
    }
  }, [pendingRequests, setPendingRequests])

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
  }, [borrowerId, pendingRequests])

  useEffect(() => {
    if (pickupDate) {
      setFormattedStartDate(format(pickupDate, 'dd-MM-yyyy'))
    }
  }, [pickupDate])

  useEffect(() => {
    if (returnDate) {
      setFormattedEndDate(format(returnDate, 'dd-MM-yyyy'))
    }
  }, [returnDate])

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
        <Button aria-hidden={false} size="small" onClick={handleClickOpen}>
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
                {pendingRequests && pendingRequests.length > 0
                  ? pendingRequests[0].messages?.borrowerMessage
                  : ''}
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
              {/* <Button
                sx={{
                  display: 'none',
                }}
                onClick={() => {
                  handleSuggest()
                }}
              >
                Suggest Another Dates
              </Button> */}
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
