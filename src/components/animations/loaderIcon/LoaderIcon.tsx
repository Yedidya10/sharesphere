import styles from './LoaderIcon.module.scss'
import { motion } from 'framer-motion';

export interface ILoaderIcon {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the LoaderIcon be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * LoaderIcon contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const LoaderIcon: React.FC<ILoaderIcon> = ({
  primary = false,
  label,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="30" cy="50" r="30" fill="#000">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          values="30;70;30"
          keyTimes="0;0.5;1"
          begin="0.1"
        />
      </circle>
      <circle cx="70" cy="50" r="30" fill="#000">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          values="30;70;30"
          keyTimes="0;0.5;1"
          begin="0.2"
        />
      </circle>
      <circle cx="30" cy="50" r="30" fill="#000">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          values="30;70;30"
          keyTimes="0;0.5;1"
          begin="0.3"
        />
      </circle>
    </svg>
  );
}

export default LoaderIcon
