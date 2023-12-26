import CardsDataGrid from '@/components/cardsDataGrid/CardsDataGrid'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function UsersPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  return <div style={{ height: 600, width: '100%' }}>
    <CardsDataGrid sampleTextProp={''} label={''} />
  </div>
}
