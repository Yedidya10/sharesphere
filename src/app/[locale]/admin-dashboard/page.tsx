'use client'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
// import { unstable_setRequestLocale } from 'next-intl/server'

export default function AdminDashboardPage(
  {
    params: { locale },
  }: {
    params: { locale: string }
  }
) {
  const { data: session, status } = useSession()

  return (
    <>
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          m: 'auto',
        }}
      ></Box>
    </>
  )
}
