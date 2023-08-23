
import * as React from 'react'
import Box from '@mui/material/Box'

export const metadata = {
  title: 'All Items',
  description: 'All Items',
}

export default async function AllItemsLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
