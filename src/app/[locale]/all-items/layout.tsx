
import * as React from 'react'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export const metadata = {
  title: 'All Items',
  description: 'All Items',
}

export default async function AllItemsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {

  unstable_setRequestLocale(locale)
  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      {children}
    </Box>
  )
}
