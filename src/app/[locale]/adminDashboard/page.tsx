'use client'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function AdminDashboardPage() {
  const { t } = useTranslation('profile')
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
