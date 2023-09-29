import PublishedItemsLabTabs from '@/components/cards/currentUserOwnedCards/CurrentUserOwnedCards'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function YourItemsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
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
