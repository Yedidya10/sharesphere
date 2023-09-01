import MessagesDrawer from '@/components/layouts/messagesDrawer/MessagesDrawer'
import Box from '@mui/material/Box'
import * as React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

const DRAWER_WIDTH = 400

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login?callbackUrl=/dashboard')
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        ml: `${DRAWER_WIDTH}px`,
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingBlock: 1,
        paddingInline: 2,
        height: 'calc(100vh - 70px)',
      }}
    >
      <MessagesDrawer
        drawerWidth={DRAWER_WIDTH}
        sampleTextProp={''}
        label={''}
      />
      {children}
    </Box>
  )
}
