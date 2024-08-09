'use client'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@/components/mui/Link'

export default function AuthErrorPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const router = useRouter()
  const { error } = router.query

  let errorMessage = 'An unknown error occurred'

  switch (error) {
    case 'Configuration':
      errorMessage =
        'There is a problem with the server configuration. Please try again later.'
      break
    case 'AccessDenied':
      errorMessage = 'You do not have permission to sign in.'
      break
    case 'Verification':
      errorMessage = 'The sign-in link has expired or has already been used.'
      break
    default:
      errorMessage = 'An unexpected error occurred. Please try again later.'
      break
  }

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <Typography variant="h1">Error</Typography>
      <Typography variant="body1">{errorMessage}</Typography>
      <Link href="/">Go back to Home</Link>
    </Box>
  )
}
