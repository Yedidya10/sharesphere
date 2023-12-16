import * as React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import AddItemForm from '@/components/forms/addItemForm/AddItemForm'

export default function AddItem({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const authKey = process.env.TRANSLOADIT_KEY
  const authSecret = process.env.TRANSLOADIT_SECRET
  const templateId = process.env.TRANSLOADIT_TEMPLATE_ID

  if (!authKey || !authSecret || !templateId) {
    throw new Error('Missing Transloadit env variables')
  }

  return <AddItemForm label={''} authKey={authKey} authSecret={authSecret} templateId={templateId} />
}
