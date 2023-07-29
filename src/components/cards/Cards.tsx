'use client'

import { useEffect, useState } from 'react'
import MediaCard from '../mediaCard/MediaCard'
import styles from './Cards.module.scss'
import Grid from '@mui/material/Grid'

interface Card {
  id: string
  heading: string
  author: string
  description: string
  imageSrc: string
  alt: string
}

interface Card {
  cardIds: {
    isbn: string;
    danacode: string;
    barcode: string;
  };
  details: {
    category: string;
    name: string;
    author: string;
    brand: string;
    description: string;
    imageUrl: string;
  };
  condition: string;
  maxLoanPeriod: string;
  location: {
    city: string;
    streetName: string;
    streetNumber: string;
    zipCode: string;
  };
  owner: {
    id: string; // Assuming the 'id' property is a string, you can change it to the appropriate type if needed
  };
}


export interface ICards {
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

const Cards: React.FC<ICards> = ({ primary = false, label, ...props }) => {
  const [cards, setCards] = useState<Card[]>([])

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

        if (response.ok) {
          return setCards(data)
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
    <Grid container rowSpacing={2} columnSpacing={2}>
      {cards.map((card: Card) => (
        <Grid key={card.id} item xs={4}>
          <MediaCard
            label={''}
    
            heading={card.details.name}
            description={card.details.description}
            imageSrc={card.details.imageUrl}
            alt={''}
            author={card.details.author}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Cards
