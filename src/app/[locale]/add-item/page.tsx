import AddItemForm from '@/components/forms/addItemForm/AddItemForm'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function AddItem({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  const authKey = process.env.TRANSLOADIT_KEY
  const authSecret = process.env.TRANSLOADIT_SECRET
  const templateId = process.env.TRANSLOADIT_TEMPLATE_ID

  if (!authKey || !authSecret || !templateId) {
    throw new Error('Missing Transloadit env variables')
  }

  return (
    <AddItemForm
      label={''}
      authKey={authKey}
      authSecret={authSecret}
      templateId={templateId}
      locale={locale}
    />
  )
}
