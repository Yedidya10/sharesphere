'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import React, { Suspense, lazy } from 'react'
const ItemPendingRequest = lazy(
  () => import('@/components/itemPendingRequest/ItemPendingRequest')
)

export interface IItemsPendingRequestsList {
  sampleTextProp: string
  pendingRequestsItems: any
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
  pendingRequestsItems,
  ...props
}) => {
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
        {pendingRequestsItems.map((card: any) => (
          <Suspense key={card.id} fallback={<CircularProgress />}>
            <ItemPendingRequest
              card={card}
              label={card.details.name}
              sampleTextProp={''}
            />
          </Suspense>
        ))}
      </Box>
    </Box>
  )
}

export default ItemsPendingRequestsList
