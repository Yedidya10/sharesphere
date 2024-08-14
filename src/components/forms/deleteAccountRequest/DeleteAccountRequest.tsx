'use client'

import Link from '@/components/mui/Link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const devMail = 'yedidya.dev@gamil.com'

export interface IDeleteAccountRequest {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the DeleteAccountRequest be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * DeleteAccountRequest contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const DeleteAccountRequest: React.FC<IDeleteAccountRequest> = ({
  primary = false,
  label,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '300px',
      }}
    >
      <Typography variant="h2">Delete Account</Typography>
      <Typography variant="body1">
        If you want to delete your account, please send an request to:
      </Typography>
      <Typography color="primary"
      variant="body1">{devMail}</Typography>
    </Box>
  )
}

export default DeleteAccountRequest
