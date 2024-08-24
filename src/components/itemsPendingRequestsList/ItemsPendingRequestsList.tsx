'use client'

import { Item } from '@/utils/types/item'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Request } from '@/utils/types/request'
const ItemPendingRequest = lazy(
  () => import('@/components/itemPendingRequest/ItemPendingRequest')
)

export interface IItemsPendingRequestsList {
  sampleTextProp: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemsPendingRequestsList be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemsPendingRequestsList contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ItemsPendingRequestsList: React.FC<IItemsPendingRequestsList> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState<string>('')
  const [pendingRequestsItems, setPendingRequestsItems] = useState<Item[]>([])
  const [pendingRequests, setPendingRequests] = useState<Request[] | []>([])

  const handleAllRequestsProcessed = (itemId: string) => {
    setPendingRequestsItems((prevItems) =>
      prevItems.filter((item) => item._id!.toString() !== itemId)
    )
  }

  useEffect(() => {
    if (!pendingRequests) {
      return
    }
  }, [pendingRequests])
  useEffect(() => {
    if (session) {
      const userId = session?.user?.id
      setUserId(userId)
    }
  }, [session])

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_URL

    if (userId) {
      const getPendingRequestsItems = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/cards/userId/${userId}/ownedCards/pendingRequests`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (!response.ok || response.status === 404) {
            return
          }

          const data = await response.json()
          setPendingRequests(data.requests)
          setPendingRequestsItems(data.items)
        } catch (error: any) {
          console.error('Error fetching user items:', error.message)
        }
      }

      getPendingRequestsItems()
    }
  }, [userId])

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto', // Enable horizontal scrolling
        overflowY: 'hidden',
        m: 0,
        p: 0.1,
        paddingBlockEnd: 1,
        scrollbarWidth: 'thin', // For Firefox
        '::-webkit-scrollbar': {
          width: '8px', // For Chrome, Safari, and Opera
        },
      }}
    >
      <Typography variant="h6" gutterBottom component="h2">
        Items Pending Requests
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          width: 'fit-content', // Adjust width as needed
          m: 0,
          p: 0,
          gap: 2,
        }}
      >
        {pendingRequestsItems.map((item: Item) => (
          <Suspense key={item?._id?.toString()} fallback={<CircularProgress />}>
            <ItemPendingRequest
              card={item}
              pendingRequests={pendingRequests as Request[]}
              setPendingRequests={setPendingRequests}
              onAllRequestsProcessed={handleAllRequestsProcessed}
              label={item?.name}
              sampleTextProp={''}
            />
          </Suspense>
        ))}
      </Box>
    </Box>
  )
}

export default ItemsPendingRequestsList
