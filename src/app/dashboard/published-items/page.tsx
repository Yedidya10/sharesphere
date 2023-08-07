'use client'

import PublishedItemsLabTabs from '@/components/publishedItemsLabTabs/PublishedItemsLabTabs'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export default function Home() {
  const { t } = useTranslation('home')
  const [alert, setAlert] = useState<boolean>(true)

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <PublishedItemsLabTabs sampleTextProp={''} label={''} />
    </Box>
  )
}
