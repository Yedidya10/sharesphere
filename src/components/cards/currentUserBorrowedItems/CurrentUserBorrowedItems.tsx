'use client'

import LendingStatusFilter from '@/components/forms/lendingStatusFilter/LendingStatusFilter'
import isUserOwnedItemsExistState from '@/recoils/isUserOwnedItemsExistState/isUserOwnedItemsExistState'
import { Item } from '@/utils/types/item'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import UserBorrowedCardInfo from '../userBorrowedCardInfo/UserBorrowedCardInfo'

export interface ICurrentUserBorrowedItems {
  sampleTextProp: string
  userBorrowedItems: Item[]
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the CurrentUserBorrowedItems be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CurrentUserBorrowedItems contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const CurrentUserBorrowedItems: React.FC<ICurrentUserBorrowedItems> = ({
  primary = false,
  label,
  sampleTextProp,
  userBorrowedItems,
  ...props
}) => {
  const { data: session, status } = useSession()
  const [isOwner, setIsOwner] = React.useState<boolean | null>(null)
  const [isCurrentUserBorrowedItemsExist, setIsCurrentUserBorrowedItemsExist] =
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

  // React.useEffect(() => {
  //   if (userBorrowedItems?.length !== 0) {
  //     setIsCurrentUserBorrowedItemsExist(true)
  //   }
  // }, [setIsCurrentUserBorrowedItemsExist, userBorrowedItems?.length])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {userBorrowedItems?.length !== 0 ? (
        <>
          <LendingStatusFilter
            label="LendingStatusFilter"
            filterType="lendingStatus"
            filterName="Lending Status"
            control={control}
          />

          <Grid container spacing={2}>
            {userBorrowedItems?.map((card) => {
              return (
                <Grid
                  // @ts-ignore
                  key={card._id}
                  xs={12}
                  sx={{
                    height: 'max-content',
                  }}
                >
                  <UserBorrowedCardInfo card={card} label={''} />
                </Grid>
              )
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

export default CurrentUserBorrowedItems
