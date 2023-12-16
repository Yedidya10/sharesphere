import Cards from '@/components/cards/allCards/AllCards'
import Box from '@mui/material/Box'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function AllItems({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = useTranslations('AllItems')
  unstable_setRequestLocale(locale)

  const cardsTranslations = {
    noItemsFound: t('Cards.noItemsFound'),
  }

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <Cards label={''} t={cardsTranslations} />
    </Box>
  )
}
