import PublishedItemsLabTabs from '@/components/cards/currentUserOwnedCards/CurrentUserOwnedCards'
import Box from '@mui/material/Box'
import { useTranslations } from 'next-intl'

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
