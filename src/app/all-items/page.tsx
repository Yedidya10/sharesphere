'use client'

import Cards from '@/components/cards/allCards/AllCards'
import SearchBar from '@/components/forms/searchBar/SearchBar'
import Box from '@mui/material/Box'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export default function Home() {
  const { t } = useTranslation('home')
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <SearchBar setSearchQuery={setSearchQuery} />
      <Cards searchQuery={searchQuery} label={''} />
    </Box>
  )
}
