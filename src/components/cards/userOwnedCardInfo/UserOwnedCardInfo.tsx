'use client'

import { Item } from '@/utils/types/item'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'

export interface IUserOwnedCardInfo {
  isOwner: boolean
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
   * How large should the UserOwnedCardInfo be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * UserOwnedCardInfo contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <Tooltip title={checked ? 'Active' : 'Inactive'}>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Tooltip>
  )
}

const UserOwnedCardInfo: React.FC<IUserOwnedCardInfo> = ({
  primary = false,
  label,
  isOwner,
  card,
  ...props
}) => {
  const { data: session, status } = useSession()
  const [itemMaxLoanPeriod, setItemMaxLoanPeriod] = useState<string>('')
  const [itemCondition, setItemCondition] = useState<string>('')

  const {
    ids,
    mainCategory,
    name,
    description,
    imageUrl,
    ownerId,
    condition,
    location,
    maxLoanPeriod,
  } = card
  const { city, streetName, streetNumber, zipCode } = location

  const handleDelete = async () => {
    try {
      // @ts-ignore
      const res = await fetch(`/api/cards/cardId/${card._id}/delete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 200) {
        console.info('success')
      } else {
        console.info('error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
            alt={name}
            objectFit="contain"
            objectPosition="center"
            src={imageUrl}
          />
        </Grid>
        <Grid xs={58}>
          <Box
            sx={{
              display: 'flex',
              padding: '10px',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Typography>{name}</Typography>
            {mainCategory === 'book' && (
              <>
                <Typography>ISBN: {ids?.isbn}</Typography>
                <Typography>מחבר: {card?.author}</Typography>
              </>
            )}
            <Typography component={'p'}>{description}</Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                gap: '10px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '.9rem',
                }}
              >
                Item Location:
              </Typography>
              <Typography>
                {streetName} st. {city}, Israel
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '80px',
            gap: '10px',
          }}
          xs={20}
        >
          {status === 'authenticated' && isOwner && (
            <CardActions>
              {deleteButton && (
                <Tooltip title="Delete">
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              {editButton && <ItemEditButton label={''} formProps={card} />}
              {restoreButton && (
                <Tooltip title="Restore">
                  <IconButton>
                    <RestoreFromTrashIcon />
                  </IconButton>
                </Tooltip>
              )}
              {activeButton && <ControlledSwitches />}
            </CardActions>
          )}
        </Grid> */}
      </Grid>
    </Card>
  )
}

export default UserOwnedCardInfo
