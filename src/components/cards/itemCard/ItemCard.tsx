'use client'

import { Item } from '@/utils/types/item'
import { Request } from '@/utils/types/request'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { lazy, Suspense, useState } from 'react'
const CardInfo = lazy(() => import('../cardModal/CardModal'))

export interface IItemCard {
  card: Item
  imageWidth: number
  imageHeight: number
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemCard be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemCard contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ItemCard: React.FC<IItemCard> = ({
  imageHeight,
  imageWidth,
  card,
  card: { name, description, author, imageUrl },
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  // TODO: Implement the handleChipClick function
  const handleChipClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <>
      <Card
        sx={{
          '& .MuiCardContent-root': {
            padding: '0.8rem',
          },
        }}
      >
        <Box
          sx={{
            height: '400px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '250px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '5px',
            }}
          >
            <Image
              style={{
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              fill={true}
              alt={`${name}`}
              src={imageUrl}
              onClick={handleOpen}
            />
          </Box>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                marginBottom: '0.5rem',
              }}
            >
              <Chip
                label={card.mainCategory}
                size="small"
                variant="outlined"
                onClick={handleChipClick}
              />
            </Stack>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2">{author}</Typography>
            <Typography
              variant="body2"
              sx={{
                maxHeight: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '0.8rem',
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Suspense fallback={<CircularProgress />}>
        <CardInfo
          openModal={openModal}
          handleClose={handleClose}
          label={''}
          card={card}
        />
      </Suspense>
    </>
  )
}

export default ItemCard
