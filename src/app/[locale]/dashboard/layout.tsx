import DashboardDrawer from '@/components/layouts/dashboardDrawer/DashboardDrawer'
import Box from '@mui/material/Box'
import * as React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { unstable_setRequestLocale } from 'next-intl/server'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
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
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login?callbackUrl=/dashboard')
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
