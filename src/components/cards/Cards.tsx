'use client'

import { useEffect, useState } from 'react'
import MediaCard from '../mediaCard/MediaCard'
import styles from './Cards.module.scss'
import Grid from '@mui/material/Grid'

interface Card {
  _id: string | null | undefined
  heading: string
  author: string
  description: string
  imageSrc: string
  alt: string
  ownerId: string
  loanable: boolean
}

interface Card {
  cardIds: {
    isbn: string
    danacode: string
    barcode: string
  }
  details: {
    category: string
    name: string
    author: string
    brand: string
    description: string
    imageUrl: string
  }
  condition: string
  maxLoanPeriod: string
  location: {
    city: string
    streetName: string
    streetNumber: string
    zipCode: string
  }
  owner: {
    id: string // Assuming the 'id' property is a string, you can change it to the appropriate type if needed
  }
}

export interface ICards {
  searchQuery: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the Cards be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Cards contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const Cards: React.FC<ICards> = ({
  primary = false,
  label,
  searchQuery,
  ...props
}) => {
  const [allCards, setAllCards] = useState<Card[]>([])

  const filteredCards = allCards.filter((card) => {
    const isbnMatch = card.cardIds?.isbn
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const danacodeMatch = card.cardIds?.danacode
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const barcodeMatch = card.cardIds?.barcode
      .toLowerCase()
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
    async function fetchCards() {
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
          throw new Error(data.error || 'Failed to fetch cards')
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCards()
  }, [])

  return (
    <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
      {filteredCards.length > 0 &&
        filteredCards.map((card: Card) => (
          <Grid key={card._id} item xs={15} mb={7.5} sm={10} lg={6}>
            <MediaCard
              label={''}
              heading={card.details.name}
              description={card.details.description}
              imageSrc={card.details.imageUrl}
              alt={''}
              author={card.details.author}
              ownerId={card.owner?.id}
              loanable={card.loanable}
              itemCondition={card.condition}
              maxLoanPeriod={card.maxLoanPeriod}
              itemLocation={card.location}
              imageWidth={180}
              imageHeight={300}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default Cards
