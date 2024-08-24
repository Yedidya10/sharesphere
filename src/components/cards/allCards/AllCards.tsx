'use client'

import SearchBar from '@/components/forms/searchBar/SearchBar'
import UserProfileCompletionForm from '@/components/forms/userProfileCompletionForm/UserProfileCompletionForm'
import { Item } from '@/utils/types/item'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import AllItemsSkeletons from '@/components/skeletons/AllItemsSkeletons'
import { useSession } from 'next-auth/react'
import { lazy, Suspense, useEffect, useState } from 'react'
const ItemCard = lazy(() => import('../itemCard/ItemCard'))

export interface IAllCards {
  // allCards: Item[]
  t: {
    noItemsFound: string
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
   * How large should the AllCards be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * AllCards contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const AllCards: React.FC<IAllCards> = ({
  primary = false,
  label,
  t,
  // allCards,
  ...props
}) => {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [allCards, setAllCards] = useState<Item[]>([])
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => setOpenModal(false)

  const checkModalDisplay = () => {
    const nextShowTime = localStorage.getItem(
      'nextProfileCompletionModalShowTime'
    )
    if (nextShowTime === 'never') {
      return false
    }

    if (!nextShowTime || new Date().getTime() > Number(nextShowTime)) {
      return true
    }
  }

  useEffect(() => {
    const getAllCards = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/cards`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.ok) {
          const items = await response.json()
          return setAllCards(items)
        }
      } catch (error: any) {
        throw new Error(error.message)
      } finally {
        setLoading(false) // Set loading to false after the API call completes
      }
    }

    getAllCards()

    if (session?.user?.id && checkModalDisplay()) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            const user = data.user

            if (!user.address) {
              setOpenModal(true)
            }
          }
        } catch (error: any) {
          throw new Error(error.message)
        }
      }
      fetchData()
    }
  }, [session?.user.id])

  const [searchQuery, setSearchQuery] = useState<string>('')
  const filteredSearchItems = allCards.filter((item: Item) => {
    const authorMatch =
      item.author?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
    const nameMatch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
    const isbnMatch =
      item.ids?.isbn?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
    const danacodeMatch =
      item.ids?.danacode?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false
    const barcodeMatch =
      item.ids?.barcode?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false

    return (
      nameMatch || authorMatch || barcodeMatch || danacodeMatch || isbnMatch
    )
  })

  const skeletonItem = (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton
        variant="rounded"
        width={100}
        height={20}
        sx={{
          borderRadius: '1rem',
        }}
      />
      <Skeleton variant="text" width={140} height={35} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" width={'80%'} height={25} />
    </Stack>
  )

  const filteredVisibleItems = filteredSearchItems.filter(
    (card: Item) =>
      card.postingStatus === 'published' && card.ownerId !== session?.user?.id
  )

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      {loading ? (
        <AllItemsSkeletons />
      ) : filteredVisibleItems.length > 0 ? (
        <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
          {filteredVisibleItems.map((item: Item) => (
            // @ts-ignore
            <Grid key={item._id} xs={15} mb={7.5} sm={10} lg={6}>
              <Suspense fallback={skeletonItem}>
                <ItemCard
                  label={''}
                  item={item}
                  imageWidth={150}
                  imageHeight={250}
                />
              </Suspense>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(50vh - 64px)',
          }}
        >
          <Typography variant="h3" color="text.secondary">
            {t.noItemsFound}
          </Typography>
        </Box>
      )}
      <UserProfileCompletionForm
        openModal={openModal}
        handleClose={handleClose}
        label={''}
      />
    </>
  )
}

export default AllCards
