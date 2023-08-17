'use client'

import Box from '@mui/material/Box'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    // Perform any server-side operations or checks here
    const shouldRedirect = true // For example, condition to redirect

    if (shouldRedirect) {
      router.push('/all-items') // Redirect to the destination page
    }
  }, [router])

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    ></Box>
  )
}
