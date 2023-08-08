'use client'

import StarRateIcon from '@mui/icons-material/StarRate'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SpringModal from '../springModal/SpringModal'
import styles from './CardInfo.module.scss'

export interface ICardInfo {
  openModal: boolean
  handleClose: () => void
  heading: string
  description: string
  author: string
  imageSrc: string
  alt: string
  isAvailable: boolean
  ownerId: string
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
   * How large should the CardInfo be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CardInfo contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const CardInfo: React.FC<ICardInfo> = ({
  primary = false,
  label,
  heading,
  description,
  author,
  imageSrc,
  alt,
  openModal,
  handleClose,
  isAvailable,
  itemLocation,
  itemCondition,
  ...props
}) => {
  const [maxLoanPeriod, setMaxLoanPeriod] = useState<string>('')
  const [condition, setCondition] = useState<string>('')

  const [city, streetName, streetNumber, zipCode] = [
    itemLocation.city,
    itemLocation.streetName,
    itemLocation.streetNumber,
    itemLocation.zipCode,
  ]

  useEffect(() => {
    setCondition(itemCondition)
  }, [itemCondition])

  return (
    <SpringModal handleClose={handleClose} openModal={openModal} label={''}>
      <Box className={styles.cardInfo}>
        <Grid container columnSpacing={3} columns={100}>
          <Grid
            sx={{
              position: 'relative',
            }}
            item
            xs={22}
          >
            <Image
              className={styles.image}
              fill={true}
              alt={alt}
              objectFit="contain"
              objectPosition="top"
              src={imageSrc}
            />
          </Grid>
          <Grid item xs={58}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography className={styles.title}>{heading}</Typography>
              <Typography className={styles.author}>מחבר: {author}</Typography>
              <Typography component={'p'} className={styles.description}>
                {description}
              </Typography>
              <Box className={styles.itemLender}></Box>
              <Box className={styles.itemLocation}>
                <Typography className={styles.optionText}>
                  מיקום הפריט:
                </Typography>
                <Typography className={styles.optionText}>
                  {streetName}, {city} - מרחק הפריט ממך: {streetNumber} ק&quotמ
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '140px',
              gap: '10px',
            }}
            xs={20}
            className={styles.itemOptions}
          >
            {/* {isAvailable ? (
              <ItemRequestButton label={''} />
            ) : (
              <ItemAlertButton label={''} />
            )} */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                gap: '5px',
                borderRadius: '3px',
                boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.15)',
              }}
            >
              <StarRateIcon fontSize="large" color="primary" />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Typography sx={{ fontSize: '.8rem' }}>Item Status:</Typography>
                <Typography
                  sx={{ fontSize: '.8rem' }}
                >{`${condition}/5`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SpringModal>
  )
}

export default CardInfo
