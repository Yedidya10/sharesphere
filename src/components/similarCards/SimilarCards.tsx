'use client'

import { useState } from 'react'
import Card from '../mediaCard/MediaCard'
import styles from './SimilarCards.module.scss'

export interface ISimilarCards {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SimilarCards be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SimilarCards contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SimilarCards: React.FC<ISimilarCards> = ({
  primary = false,
  label,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.similarCards}>
     
    </div>
  )
}

export default SimilarCards
