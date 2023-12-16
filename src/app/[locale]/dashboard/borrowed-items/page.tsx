import CurrentUserBorrowedCards from '@/components/cards/currentUserBorrowedCards/CurrentUserBorrowedCards'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function BorrowedItemsPage({
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
      {/* <BorrowedItems /> */}
    </Box>
  )
}
