'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CardInfo from '../cardInfo/CardInfo'

export interface IMediaCard {
  heading: string
  description: string
  author: string
  imageWidth: number
  imageHeight: number
  ownerId: string
  imageSrc: string
  alt: string
  loanable: boolean
  itemCondition: string
  maxLoanPeriod: string
  itemLocation: {
    city: string
    streetName: string
    streetNumber: string
    zipCode: string
  }

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
  ownerId,
  loanable,
  imageHeight,
  imageWidth,
  itemCondition,
  maxLoanPeriod,
  itemLocation,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const [isLoanable, setIsLoanable] = useState<boolean | null>(null)

  useEffect(() => {
    loanable ? setIsLoanable(true) : setIsLoanable(false)
  }, [])

  return (
    <>
      <Card>
        <Box>
          <Box >
            <Image
              style={{
                width: '100%',
                height: 'auto',
              }}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              src={imageSrc}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {heading}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      {/* <CardInfo
        openModal={openModal}
        handleClose={handleClose}
        heading={heading}
        description={description}
        author={author}
        imageSrc={imageSrc}
        alt={''}
        label={''}
        isAvailable={isLoanable !== null ? isLoanable : false}
        itemCondition={itemCondition}
        maxLoanPeriod={maxLoanPeriod}
        itemLocation={itemLocation}
        ownerId={ownerId}
      /> */}
    </>
  )
}

export default MediaCard
