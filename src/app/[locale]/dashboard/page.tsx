import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function DashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        width: '100%',
        m: 'auto',
      }}
    ></Box>
  )
}
