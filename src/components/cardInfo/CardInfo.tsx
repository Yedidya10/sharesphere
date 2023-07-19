'use client'

import Image from 'next/image'
import styles from './CardInfo.module.scss'
import { BsCalendar3Week } from 'react-icons/bs'
import { GoStar } from 'react-icons/go'
import { useState } from 'react'
import SimilarCards from '../similarCards/SimilarCards'

export interface ICardInfo {
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
   * How large should the CardInfo be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CardInfo contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const CardInfo: React.FC<ICardInfo> = ({
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
  const [isAvailable, setAvailable] = useState(true)
  const [rating, setRating] = useState(2.5)
  const [isRequested, setRequested] = useState(true)

  return (
    <div className={styles.cardInfo}>
      <div className={styles.itemInfo}>
        <Image
          className={styles.image}
          width={imageWidth}
          height={imageHeight}
          style={{ objectFit: 'contain', objectPosition: 'center' }}
          alt={alt}
          src={imageSrc}
        />
        <div className={styles.content}>
          <div className={styles.itemContent}>
            <span className={styles.title}>{title}</span>
            <span className={styles.author}>מחבר: {author}</span>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.itemLender}>
            <Image src={''} alt={''}/>
            <span className={styles.itemLocation}>
              ירושלים
            </span>
          </div>
        </div>
        <div className={styles.itemOptions}>
          {isAvailable && (
            <button className={styles.itemOption}>
              {
                <BsCalendar3Week
                  size={30}
                  style={{
                    color: 'green',
                  }}
                />
              }
              <span className={styles.optionText}>זמין להשאלה</span>
            </button>
          )}
          {!isAvailable && (
            <button className={styles.itemOption}>
              {/* <span className={`${styles.optionText} ${styles.optionBold}`}>
              יומן השאלות
            </span> */}
              {
                <BsCalendar3Week
                  size={30}
                  style={{
                    color: 'rgb(171, 24, 24)',
                  }}
                />
              }
              <span className={styles.optionText}>לא זמין</span>
            </button>
          )}
          <div className={styles.itemOption}>
            {<GoStar size={30} />}
            <div
              style={{
                display: 'flex',
                gap: '5px',
              }}
            >
              <span className={styles.optionText}>מצב פריט:</span>
              <span
                style={{
                  fontSize: '.75rem',
                  gap: '5px',
                }}
              >{`${rating}/5`}</span>
            </div>
          </div>
          {isAvailable && (
            <div className={styles.borrowAction}>
              <button
                className={`${styles.itemOption} ${styles.askBorrow}`}
                style={{
                  width: '100%',
                  color: 'white',
                }}
                disabled={isRequested}
              >
                <span className={`${styles.optionText} ${styles.optionBold}`}>
                  בקש להשאלה
                </span>
              </button>
              {isRequested && (
                <div className={styles.requestStatus}>
                  <span
                    className={styles.optionText}
                    style={{
                      fontSize: '.7rem',
                    }}
                  >
                    סטטוס בקשה:
                  </span>
                  <span className={styles.optionText}>ממתין למענה</span>
                </div>
              )}
            </div>
          )}
          {!isAvailable && (
            <button
              className={styles.itemOption}
              style={{
                backgroundColor: 'orange',
                color: 'white',
              }}
            >
              <span className={`${styles.optionText} ${styles.optionBold}`}>
                קבל התראה
              </span>
            </button>
          )}
        </div>
      </div>
 
    </div>
  )
}

export default CardInfo
