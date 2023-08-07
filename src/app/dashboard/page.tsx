'use client'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { t } = useTranslation('profile')
  const [alert, setAlert] = useState<boolean>(true)
  const { data: session, status } = useSession()

  return (
    <>
      {alert && (
        <Alert
          onClose={() => {
            setAlert(false)
          }}
          severity="warning"
          sx={{ mt: 2, mb: 2 }}
        >
          <AlertTitle>Hello 👋</AlertTitle>
          This app is in beta version. To report malfunctions and suggestions
          click here
        </Alert>
      )}
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
