import UserInfo from '@/components/userInfo/UserInfo'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function ProfilePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <UserInfo label={''} />
    </Box>
  )
}
