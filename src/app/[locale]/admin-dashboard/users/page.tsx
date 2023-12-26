import UsersDataGrid from '@/components/usersDataGrid/UsersDataGrid'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function UsersPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  return (
    <div style={{ height: 600, width: '100%' }}>
      <UsersDataGrid sampleTextProp={''} label={''} />
    </div>
  )
}
