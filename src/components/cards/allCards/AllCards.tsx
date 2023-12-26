'use client'

import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import ItemCard from '../itemCard/ItemCard'
import SearchBar from '@/components/forms/searchBar/SearchBar'

export interface IAllCards {
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
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [allCards, setAllCards] = useState<ItemCoreWithLoanDetails[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredAllCards = allCards.filter((card) => {
    const isbnMatch = card.cardIds
      ?.isbn!.toLowerCase()
      .includes(searchQuery.toLowerCase())
    const danacodeMatch = card.cardIds
      ?.danacode!.toLowerCase()
      .includes(searchQuery.toLowerCase())
    const barcodeMatch = card.cardIds
      ?.barcode!.toLowerCase()
      .includes(searchQuery.toLowerCase())
    const authorMatch = card.details.author
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const nameMatch = card.details.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    return (
      nameMatch || authorMatch || barcodeMatch || danacodeMatch || isbnMatch
    )
  })

  useEffect(() => {
    async function fetchAllCards() {
      try {
        const response = await fetch('/api/cards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        const cards = data.cards

        if (response.ok) {
          return setAllCards(cards)
        } else {
          throw new Error(cards.error || 'Failed to fetch cards')
        }
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setIsLoading(false) // Set loading state to false after fetching
      }
    }
    fetchAllCards()
  }, [])

  const skeletonArray = Array.from({ length: 10 })

  console.log(allCards)

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
          {skeletonArray.slice(0, 10).map((_, index) => (
            <Grid key={index} xs={15} mb={7.5} sm={10} lg={6}>
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
            </Grid>
          ))}
        </Grid>
      ) : filteredAllCards.length > 0 ? (
        <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
          {filteredAllCards.map((card: ItemCoreWithLoanDetails) =>
            card.status === 'published' ? (
              // card.owner !== session?.user?.id && (
              // @ts-ignore
              <Grid key={card._id} xs={15} mb={7.5} sm={10} lg={6}>
                <ItemCard
                  label={''}
                  card={card}
                  imageWidth={180}
                  imageHeight={300}
                />
              </Grid>
            ) : null
          )}
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
  //             // card.owner !== session?.user?.id && (
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
