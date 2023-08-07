'use client'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export interface ISearchBar {
  setSearchQuery: (query: string) => void
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SearchBar be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SearchBar contents
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SearchBar: React.FC<ISearchBar> = ({ setSearchQuery }) => {
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center the SearchBar horizontally
        alignItems: 'center', // Center the SearchBar vertically
        mb: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="search-bar"
        sx={{
          width: '600px',
          '& > :not(style)': {
            m: 1,
            width: '600px',
            height: '80px',
            fontSize: 20,
          },
        }}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name, author, barcode"
      />
    </Box>
  )
}

export default SearchBar
