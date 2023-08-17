import { Inter } from 'next/font/google'
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import { Roboto } from 'next/font/google'
import Box from '@mui/material/Box'
import DashboardDrawer from '@/components/layouts/dashboardDrawer/DashboardDrawer'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Scalable Next.js Project Template',
}

const DRAWER_WIDTH = 240

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation('common')

  const dir = () => {
    if (lang === 'he') {
      return 'rtl'
    } else {
      return 'ltr'
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        ml: `${DRAWER_WIDTH}px`,
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingBlock: 1,
        paddingInline: 2,
        height: 'calc(100vh - 70px)',
      }}
    >
      <DashboardDrawer
        drawerWidth={DRAWER_WIDTH}
        sampleTextProp={''}
        label={''}
      />
      {children}
    </Box>
  )
}
