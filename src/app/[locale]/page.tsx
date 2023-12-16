import Box from '@mui/material/Box'
import { redirect } from '@/navigation'
import * as React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  // Perform any server-side operations or checks here
  const shouldRedirect = true // For example, condition to redirect
  if (shouldRedirect) {
    redirect(`/all-items`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    ></Box>
  )
}
