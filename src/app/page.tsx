'use client'

import MediaCard from '@/components/mediaCard/MediaCard'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import useTranslation from 'next-translate/useTranslation'
import Cards from '@/components/cards/Cards'
import SearchBar from '@/components/forms/searchBar/SearchBar'
import { useState } from 'react'

export default function Home() {
  const { t } = useTranslation('home')
  const example = t('variable-example', { count: 42 })
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(true)

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        width: '100%',
        m: 'auto',
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
      <SearchBar setSearchQuery={setSearchQuery} />
      <Cards searchQuery={searchQuery} label={''} />
    </Box>
  )
}
