import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function SettingsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <Typography variant="h1">Settings Page</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">Delete Account</Typography>
        <Typography variant="body1">
          This action will permanently delete your account.
        </Typography>
      </Box>
    </Box>
  )
}
