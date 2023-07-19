'use client'

import { useState } from 'react'
import Card from '../card/Card'
import styles from './Cards.module.scss'

interface BookCard {
  id: string
  title: string
  author: string
  description: string
  imageSrc: string
  alt: string
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
  const [bookCards, setBookCards] = useState<BookCard[]>([])

  return (
    <ul className={styles.cards}>
      {bookCards.map((bookCard: BookCard) => (
        <Card
          key={bookCard.id}
          label={''}
          imageWidth={200}
          imageHeight={300}
          title={bookCard.title}
          description={bookCard.description}
          imageSrc={bookCard.imageSrc}
          alt={bookCard.alt}
          author={bookCard.author}
        />
      ))}
    </ul>
  )
}

export default Cards
