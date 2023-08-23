'use client'

import BorrowedItemsLabTabs from '@/components/borrowedItemsLabTabs/BorrowedItemsLabTabs'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import { useState } from 'react'

export default function BorrowedItemsPage() {
  const [alert, setAlert] = useState<boolean>(true)

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
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
      <BorrowedItemsLabTabs sampleTextProp={''} label={''} />
    </Box>
  )
}
