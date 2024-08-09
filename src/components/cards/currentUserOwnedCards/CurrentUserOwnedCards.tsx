'use client'

import PostingStatusFilter from '@/components/forms/postingStatusFilter/PostingStatusFilter'
import isUserOwnedItemsExistState from '@/recoils/isUserOwnedItemsExistState/isUserOwnedItemsExistState'
import { Item } from '@/utils/types/item'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import UserOwnedCardInfo from '../userOwnedCardInfo/UserOwnedCardInfo'

export interface ICurrentUserOwnedCards {
  sampleTextProp: string
  userOwnedItems: Item[]
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the CurrentUserOwnedCards be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CurrentUserOwnedCards contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const CurrentUserOwnedCards: React.FC<ICurrentUserOwnedCards> = ({
  primary = false,
  label,
  sampleTextProp,
  userOwnedItems,
  ...props
}) => {
  const { data: session, status } = useSession()
  const [isOwner, setIsOwner] = React.useState<boolean | null>(null)
  const [isCurrentUserOwnedCardsExist, setIsCurrentUserOwnedCardsExist] =
    useRecoilState(isUserOwnedItemsExistState)

  React.useEffect(() => {
    if (session?.user?.id) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [session?.user?.id])

  const {
    watch,
    reset,
    control,
    setError,
    clearErrors,
    getValues,
    getFieldState,
    formState: { isValid, isDirty, errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      postingStatus: ['all'],
      lendingStatus: ['all'],
    },
  })

  React.useEffect(() => {
    if (userOwnedItems?.length !== 0) {
      setIsCurrentUserOwnedCardsExist(true)
    }
  }, [setIsCurrentUserOwnedCardsExist, userOwnedItems?.length])

  const postingStatusValue = watch('postingStatus')

  const isPublished =
    postingStatusValue.includes('published') ||
    postingStatusValue.includes('all')

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {userOwnedItems?.length !== 0 ? (
        <>
          <PostingStatusFilter
            primary={primary}
            label={label}
            control={control}
            filterType={'postingStatus'}
            filterName={'Posting Status'}
          />
          <Grid container spacing={2}>
            {userOwnedItems?.map((card) => {
              // Check if the card's postingStatus is included in statusValue array
              if (postingStatusValue.includes(card.postingStatus)) {
                return (
                  <Grid
                    // @ts-ignore
                    key={card._id}
                    xs={12}
                    sx={{
                      height: 'max-content',
                    }}
                  >
                    <UserOwnedCardInfo
                      card={card}
                      label={''}
                      isOwner={isOwner!}
                    />
                  </Grid>
                )
              } else if (postingStatusValue.includes('all')) {
                return (
                  <Grid
                    // @ts-ignore
                    key={card._id}
                    xs={12}
                    sx={{
                      height: 'max-content',
                    }}
                  >
                    <UserOwnedCardInfo
                      card={card}
                      label={''}
                      isOwner={isOwner!}
                    />
                  </Grid>
                )
              } else {
                // If not included, you may choose to handle it differently or skip the card
                return null
              }
            })}
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            paddingTop: '6rem',

            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <h1>No items found</h1>
        </Box>
      )}
    </Box>
  )
}

export default CurrentUserOwnedCards
