'use client'

import theme from '@/components/ThemeRegistry/theme'
import ItemAlertForm from '@/components/forms/itemAlertForm/ItemAlertForm'
import { Item } from '@/utils/types/item'
import { Request } from '@/utils/types/request'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
// import ItemAlertButton from '../../buttons/itemAlertButton/ItemAlertButton'
import ItemRequestButton from '../../buttons/itemRequestButton/ItemRequestButton'
import ItemRequestForm from '../../forms/itemRequestForm/ItemRequestForm'
import SpringModal from '../../springModal/SpringModal'

export interface ICardModal {
  openModal: boolean
  handleClose: () => void
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
   * How large should the CardModal be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CardModal contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const CardModal: React.FC<ICardModal> = ({
  primary = false,
  label,
  openModal,
  handleClose,
  card: {
    name,
    description,
    author,
    imageUrl,
    maxLoanPeriod,
    condition,
    location: { city, streetName, streetNumber },
  },
  card,
  ...props
}) => {
  const { data: session, status } = useSession()
  const [requests, setRequests] = useState<Request[]>()
  const [openRequestForm, setOpenRequestForm] = useState(false)
  const [isUserAlreadyRequest, setIsUserAlreadyRequest] =
    useState<boolean>(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [openAlertForm, setOpenAlertForm] = useState(false)

  useEffect(() => {
    const isRequest = async () => {
      try {
        const response = await fetch(
          `/api/requests/${card._id}/${session?.user?.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          setIsUserAlreadyRequest(false)
        }

        const data = await response.json()
        const { status } = data
        setIsUserAlreadyRequest(status === 'pending' ? true : false)
      } catch (error) {
        console.error('Error fetching requests:', error)
      }
    }

    isRequest()
  }, [session?.user?.id, card._id])

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/requests/${card._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const requests = await response.json()
      setRequests(requests)
    }

    fetchRequests()
  }, [session, card._id])

  const handleRequestButtonClick = () => {
    setOpenRequestForm(!openRequestForm)
  }

  const handleAlertButtonClick = () => {
    setOpenAlertForm(!openAlertForm)
  }

  return (
    <SpringModal
      handleClose={handleClose}
      openModal={openModal}
      label={''}
      keepMounted={true}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Grid container columnSpacing={3} columns={100}>
          <Grid
            sx={{
              position: 'relative',
            }}
            xs={22}
          >
            <Image
              fill={true}
              alt={`Image of ${name}`}
              objectFit="contain"
              objectPosition="top"
              src={imageUrl}
            />
          </Grid>
          <Grid xs={55}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography>{name}</Typography>
              <Typography>מחבר: {author}</Typography>
              <Typography component={'p'}>{description}</Typography>

              <Box>
                <Typography>מיקום הפריט:</Typography>
                <Typography>
                  {streetName}, {city} - מרחק הפריט ממך: {streetNumber} ק&quotמ
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '140px',
              gap: '10px',
            }}
            xs={23}
          >
            {/* TODO: Check if the item is already borrowed to the current user */}
            <ItemRequestButton
              label={''}
              handleClick={handleRequestButtonClick}
              isUserAlreadyRequest={isUserAlreadyRequest}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  gap: '5px',
                  borderRadius: '3px',
                  boxShadow: theme.shadows[2],
                }}
              >
                <Typography sx={{ fontSize: '.8rem' }}>Max Loan</Typography>
                <Typography sx={{ fontSize: '1.5rem' }} color="primary">
                  {maxLoanPeriod}
                </Typography>
                <Typography>Days</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  gap: '5px',
                  borderRadius: '3px',
                  boxShadow: theme.shadows[2],
                }}
              >
                <Typography sx={{ fontSize: '.8rem' }}>
                  Item Condition
                </Typography>
                <Typography
                  sx={{ fontSize: '1.5rem' }}
                  color="primary"
                >{`${condition}/5`}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Typography>Gently Used</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ItemRequestForm
          maxLoanPeriod={maxLoanPeriod}
          requests={requests || []}
          label={''}
          open={openRequestForm}
          handleRequestFormClose={handleRequestButtonClick}
          // @ts-ignore
          cardId={card._id}
          setIsUserAlreadyRequest={setIsUserAlreadyRequest}
        />
        <ItemAlertForm
          open={openAlertForm} // @ts-ignore
          cardId={card._id}
          label={''}
        />
      </Box>
    </SpringModal>
  )
}

export default CardModal
