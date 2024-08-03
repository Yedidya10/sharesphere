import CardsDataGrid from '@/components/cardsDataGrid/CardsDataGrid'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function CardsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  return (
    <div style={{ height: 600, width: '100%' }}>
      <CardsDataGrid sampleTextProp={''} label={''} />
    </div>
  )
}
