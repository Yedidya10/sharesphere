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
      <span>פריטים דומים</span>
      <div className={styles.cards}>
        <Card
          label={''}
          imageWidth={120}
          imageHeight={180}
          title={'אמרות היסוד: על האושר וההנאות האמיתיות'}
          description={
            'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי מוסן מנת.'
          }
          imageSrc={'https://simania.co.il/bookimages/covers97/978330.jpg'}
          alt={'book'}
          author={'אפיקורוס'}
        />
        <Card
          label={''}
          imageWidth={120}
          imageHeight={180}
          title={'אמרות היסוד: על האושר וההנאות האמיתיות'}
          description={
            'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי מוסן מנת.'
          }
          imageSrc={'https://simania.co.il/bookimages/covers97/978330.jpg'}
          alt={'book'}
          author={'אפיקורוס'}
        />
        <Card
          label={''}
          imageWidth={120}
          imageHeight={180}
          title={'אמרות היסוד: על האושר וההנאות האמיתיות'}
          description={
            'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי מוסן מנת.'
          }
          imageSrc={'https://simania.co.il/bookimages/covers97/978330.jpg'}
          alt={'book'}
          author={'אפיקורוס'}
        />
        <Card
          label={''}
          imageWidth={120}
          imageHeight={180}
          title={'אמרות היסוד: על האושר וההנאות האמיתיות'}
          description={
            'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי מוסן מנת.'
          }
          imageSrc={'https://simania.co.il/bookimages/covers97/978330.jpg'}
          alt={'book'}
          author={'אפיקורוס'}
        />
        <Card
          label={''}
          imageWidth={120}
          imageHeight={180}
          title={'אמרות היסוד: על האושר וההנאות האמיתיות'}
          description={
            'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי מוסן מנת.'
          }
          imageSrc={'https://simania.co.il/bookimages/covers97/978330.jpg'}
          alt={'book'}
          author={'אפיקורוס'}
        />
      </div>
    </div>
  )
}

export default SimilarCards
