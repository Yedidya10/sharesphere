'use client'

import Box from '@mui/material/Box'
import { useSession } from 'next-auth/react'

export default function MessagesPage() {
  const { data: session, status } = useSession()

  return (
    <>
    {status === 'authenticated' && (
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          m: 'auto',
        }}
      ></Box>
    )}
    </>
  )
}
