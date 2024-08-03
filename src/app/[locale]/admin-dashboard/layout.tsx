import AdminDashboardDrawer from '@/components/layouts/adminDashboardDrawer/AdminDashboardDrawer'
import Box from '@mui/material/Box'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter, Roboto } from 'next/font/google'
import * as React from 'react'

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
  children: React.ReactNode
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
