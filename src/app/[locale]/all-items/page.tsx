import AllCards from '@/components/cards/allCards/AllCards'
import { Item } from '@/utils/types/item'
import Box from '@mui/material/Box'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

async function getAllCards() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    const cards = data.cards

    if (response.ok) {
      return cards
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

function AllItemsContent({
  allCards,
}: {
  allCards: Item[]
}) {
  const t = useTranslations('AllItems')
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
      <AllCards label={''} t={cardsTranslations} allCards={allCards} />
    </Box>
  )
}

export default async function AllItems({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)

  const allCards = await getAllCards()
  return <AllItemsContent allCards={allCards} />
}
