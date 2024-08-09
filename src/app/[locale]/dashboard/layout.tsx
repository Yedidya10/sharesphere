import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import DashboardDrawer from '@/components/layouts/dashboardDrawer/DashboardDrawer'
import Box from '@mui/material/Box'
import { getServerSession } from 'next-auth'
import { unstable_setRequestLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'
import * as React from 'react'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
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
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login?callbackUrl=/dashboard')
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        marginInlineStart: `${DRAWER_WIDTH}px`,
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: 2,
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
