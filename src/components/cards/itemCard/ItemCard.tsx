'use client'

import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useState } from 'react'
import CardInfo from '../cardModal/CardModal'

export interface IItemCard {
  card: ItemCoreWithLoanDetails
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
  card: {
    details: { name, description, author, imageUrl },
  },
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const handleChipClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <>
      <Card
        sx={{
          '& .MuiCardContent-root': {
            padding: '0.8rem',
            boxShadow: 'inset 0 -20px 20px -20px rgba(0,0,0,0.17)',
          },
        }}
      >
        <Box>
          <Box>
            <Image
              style={{
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
              }}
              alt={`${name} by ${author}`}
              width={imageWidth}
              height={imageHeight}
              src={imageUrl}
              onClick={handleOpen}
            />
          </Box>
          <CardContent>
            <Stack direction="row" spacing={1}>
              <Chip
                label={card.details.category}
                size="small"
                variant="outlined"
                onClick={handleChipClick}
              />
            </Stack>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxHeight: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                boxShadow: 'inset 0 -20px 20px -20px rgba(0,0,0,0.17)',
                fontSize: '0.8rem',
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <CardInfo
        openModal={openModal}
        handleClose={handleClose}
        label={''}
        card={card}
      />
    </>
  )
}

export default ItemCard
