import Typography from '@mui/material/Typography'
import styles from './Logo.module.scss'
import { GiStoneSphere } from 'react-icons/gi'
import Link from '@/components/mui/Link'

export interface ILogo {
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
   * How large should the Logo be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Logo contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const Logo: React.FC<ILogo> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  return (
    <Link
      href="/"
      underline="none"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      <GiStoneSphere size={40} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Roboto',
          fontWeight: 700,
          letterSpacing: '.15rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Share Sphere
      </Typography>
    </Link>
  )
}

export default Logo
