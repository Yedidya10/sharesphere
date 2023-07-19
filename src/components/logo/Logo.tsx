import Typography from '@mui/material/Typography'
import styles from './Logo.module.scss'

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
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      Share Sphere
    </Typography>
  )
}

export default Logo
