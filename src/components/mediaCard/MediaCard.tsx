'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './MediaCard.module.scss'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ItemRequestButton from '../buttons/itemRequestButton/ItemRequestButton'
import Box from '@mui/material/Box'

export interface IMediaCard {
  heading: string
  description: string
  author: string

  imageSrc: string
  alt: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the MediaCard be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * MediaCard contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const MediaCard: React.FC<IMediaCard> = ({
  heading,
  description,
  author,

  imageSrc,
  alt,
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Image
          objectFit='contain'
          objectPosition='center'
          alt={alt}
          fill={true}
          src={imageSrc}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <ItemRequestButton label={''} />
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default MediaCard
