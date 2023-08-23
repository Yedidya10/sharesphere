'use client'

import PublishedItemsLabTabs from '@/components/cards/currentUserCards/CurrentUserCards'
import Box from '@mui/material/Box'

export default function YourItemsPage() {
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
