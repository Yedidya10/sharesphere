'use client'

import ItemAlertForm from '@/components/forms/itemAlertForm/ItemAlertForm'
import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import React from 'react'
import ItemAlertButton from '../../buttons/itemAlertButton/ItemAlertButton'
import ItemRequestButton from '../../buttons/itemRequestButton/ItemRequestButton'
import ItemRequestForm from '../../forms/itemRequestForm/ItemRequestForm'
import SpringModal from '../../springModal/SpringModal'
import styles from './CardModal.module.scss'

export interface ICardModal {
  openModal: boolean
  handleClose: () => void
  card: ItemCoreWithLoanDetails
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
    details: { name, description, author },
    maxLoanPeriod,
    condition,
    imageUrl,
    location: { city, streetName, streetNumber },
    currentBorrower,
  },
  card,
  ...props
}) => {
  const [openRequestForm, setOpenRequestForm] = React.useState(false)
  const [openAlertForm, setOpenAlertForm] = React.useState(false)

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
          <Grid xs={58}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography>{name}</Typography>
              <Typography>מחבר: {author}</Typography>
              <Typography component={'p'}>{description}</Typography>
              <Box></Box>
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
            xs={20}
            className={styles.itemOptions}
          >
            {currentBorrower?.loanPeriod === 0 ? (
              <ItemRequestButton
                label={''}
                handleClick={handleRequestButtonClick}
              />
            ) : (
              <ItemAlertButton
                label={''}
                handleClick={handleAlertButtonClick}
                // @ts-ignore
                cardId={card._id}
              />
            )}
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
                <Typography sx={{ fontSize: '.8rem' }}>
                  Item Condition
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ItemRequestForm
          maxLoanPeriod={maxLoanPeriod}
          label={''}
          open={openRequestForm}
          // @ts-ignore
          cardId={card._id}
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
