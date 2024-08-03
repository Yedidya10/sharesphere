import { redirect } from '@/navigation'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)

  // Perform any server-side operations or checks here
  const shouldRedirect = true // For example, condition to redirect
  if (shouldRedirect) {
    redirect(`/all-items`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    ></Box>
  )
}
