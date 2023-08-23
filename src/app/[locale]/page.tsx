'use client'

import { useLocale, useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import { useRouter } from 'next-intl/client'

import * as React from 'react'

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    // Perform any server-side operations or checks here
    const shouldRedirect = true // For example, condition to redirect

    if (shouldRedirect) {
      router.push(`/all-items`)
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
