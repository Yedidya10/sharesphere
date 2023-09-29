import { Inter } from 'next/font/google'
import * as React from 'react'
import { Roboto } from 'next/font/google'
import Box from '@mui/material/Box'
import AdminDashboardDrawer from '@/components/layouts/adminDashboardDrawer/AdminDashboardDrawer'
import { unstable_setRequestLocale } from 'next-intl/server'

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
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
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
      <AdminDashboardDrawer
        drawerWidth={DRAWER_WIDTH}
        sampleTextProp={''}
        label={''}
      />
      {children}
    </Box>
  )
}
