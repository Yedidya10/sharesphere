import Cards from '@/components/cards/allCards/AllCards'
import Box from '@mui/material/Box'
import { useTranslations } from 'next-intl'

export default function AllItems() {
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
      <Cards label={''} t={cardsTranslations} />
    </Box>
  )
}

// import Cards from '@/components/cards/allCards/AllCards'
// import Box from '@mui/material/Box'
// import { useTranslations } from 'next-intl'

// export default  function AllItems() {
//   const t = useTranslations('AllItems')

//   const translations = {
//     noItemsFound: t('noItemsFound'),
//   }

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         m: 'auto',
//       }}
//     >
//       <Cards label={''} t={translations} />
//     </Box>
//   )
// }
