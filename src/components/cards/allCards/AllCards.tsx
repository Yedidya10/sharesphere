'use client'

import SearchBar from '@/components/forms/searchBar/SearchBar'
import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import { lazy, Suspense, useState } from 'react'
const ItemCard = lazy(() => import('../itemCard/ItemCard'))

export interface IAllCards {
  allCards: ItemCoreWithLoanDetails[]
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
  allCards,
  ...props
}) => {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const corrntUserId = session?.user?.id

  const filteredAllCards = allCards.filter((card) => {
    const authorMatch =
      card.author?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false
    const nameMatch =
      card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false
    const isbnMatch =
      card.ids?.isbn?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
    const danacodeMatch =
      card.ids?.danacode?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false
    const barcodeMatch =
      card.ids?.barcode?.toLowerCase().includes(searchQuery.toLowerCase()) ??
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

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      {filteredAllCards.length > 0 && (
        <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
          {filteredAllCards.map((card: ItemCoreWithLoanDetails) =>
            card.postingStatus === 'published' &&
            card.owner !== corrntUserId ? (
              // @ts-ignore
              <Grid key={card._id} xs={15} mb={7.5} sm={10} lg={6}>
                <Suspense fallback={skeletonItem}>
                  <ItemCard
                    label={''}
                    card={card}
                    imageWidth={150}
                    imageHeight={250}
                  />
                </Suspense>
              </Grid>
            ) : null
          )}
        </Grid>
      )}
      {filteredAllCards.length === 0 && (
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
    </>
  )

  // return (
  //   {filteredAllCards.length > 0 ? (

  //     <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
  //     {isLoading ? ( // Check loading state
  //       allAllCards.slice(0, 10).map((_, index) => (
  //         <Grid key={index} xs={15} mb={7.5} sm={10} lg={6}>
  //           <Skeleton variant="rectangular" width={180} height={300} />
  //         </Grid>
  //       ))
  //     ) : (
  //       filteredAllCards.map(
  //         (card: ItemCoreWithLoanDetails) =>
  //           card.status === 'active' && (
  //             // card.owner !== corrntUserId && (
  //             // @ts-ignore
  //             <Grid key={card._id} xs={15} mb={7.5} sm={10} lg={6}>
  //               <ItemCard
  //                 label={''}
  //                 card={card}
  //                 imageWidth={180}
  //                 imageHeight={300}
  //               />
  //             </Grid>
  //   </Grid>
  //   ) : (
  //     <Box
  //     xs={12}
  //     sx={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <Typography variant="h3" >
  //       No cards found
  //     </Typography>
  //   </Box>
  //   )}

  // )
}

export default AllCards
