import styles from './BaseTemplate.module.scss'

export interface IBaseTemplate {
  sampleTextProp: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the BaseTemplate be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * BaseTemplate contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const BaseTemplate: React.FC<IBaseTemplate> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  return <div className={styles.container}>{sampleTextProp}</div>
}

export default BaseTemplate
