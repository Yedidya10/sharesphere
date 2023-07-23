'use client'

import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import CardInfo from '../cardInfo/CardInfo'
import Modal from '../springModal/SpringModal'
import styles from './Card.module.scss'

export interface ICard {
  title: string
  description: string
  author: string
  imageWidth: number
  imageHeight: number
  imageSrc: string
  alt: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the Card be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Card contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const Card: React.FC<ICard> = ({
  primary = false,
  label,
  title,
  description,
  author,
  imageWidth,
  imageHeight,
  imageSrc,
  alt,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWarper} onClick={() => setShowModal(true)}>
          <Image
            className={styles.image}
            width={imageWidth}
            height={imageHeight}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            src={imageSrc}
            alt={alt}
          />
        </div>
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <span className={styles.author}>מחבר: {author}</span>
        </div>
      </div>
      {/* {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)} label={''}>
            <CardInfo
              label={label}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              title={title}
              description={description}
              author={author}
              imageSrc={imageSrc}
              alt={alt}
            />
          </Modal>,
          document.body
        )} */}
    </>
  )
}

export default Card
