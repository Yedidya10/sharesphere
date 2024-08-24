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
import { useEffect, useState } from 'react'

export interface ICurrentUserBorrowedItems {
  sampleTextProp: string
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
  ...props
}) => {
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<string | undefined>('')
  const [userBorrowedItems, setUserBorrowedItems] = useState<Item[]>([])
  const [userRequestedItems, setUserRequestedItems] = useState<Item[]>([])
  const [isOwner, setIsOwner] = useState<boolean | null>(null)
  const [isCurrentUserBorrowedItemsExist, setIsCurrentUserBorrowedItemsExist] =
    useRecoilState(isUserOwnedItemsExistState)

  useEffect(() => {
    if (session?.user?.id) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (userId) {
      const getUserBorrowedItems = async () => {
        const BASE_URL = process.env.NEXT_PUBLIC_URL

        try {
          const response = await fetch(
            `${BASE_URL}/api/cards/userId/${userId}/borrowed`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (response.status === 404 || !response.ok) {
            // Return an empty array if no user items are found
            return []
          }

          const data = await response.json()
          setUserBorrowedItems(data)
        } catch (error: any) {
          throw new Error(error.message)
        }
      }

      getUserBorrowedItems()
    }
  }, [userId])

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
          {/* TODO: Fix the filter */}
          {/* <LendingStatusFilter
            label="LendingStatusFilter"
            filterType="lendingStatus"
            filterName="Lending Status"
            control={control}
          /> */}

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
