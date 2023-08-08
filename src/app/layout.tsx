// import 'rsuite/dist/rsuite.min.css'
import './globals.scss'
import { Inter } from 'next/font/google'
import { Session } from 'next-auth'
import { headers } from 'next/headers'
import AuthProvider from './AuthProvider'
import Header from '@/components/layouts/headerLayout/header/Header'
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import { Roboto } from 'next/font/google'
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SettingsIcon from '@mui/icons-material/Settings'
import SupportIcon from '@mui/icons-material/Support'
import LogoutIcon from '@mui/icons-material/Logout'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Scalable Next.js Project Template',
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession(headers().get('cookie') ?? '')
  const { lang } = useTranslation('common')

  const dir = () => {
    if (lang === 'he') {
      return 'rtl'
    } else {
      return 'ltr'
    }
  }

  return (
    <html lang={lang} dir={dir()}>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeRegistry>
            <Header sampleTextProp={''} label={''} />
          
            <Box
              component="main"
              sx={{
                width: '100%',
                flexGrow: 1,
                bgcolor: 'background.default',
                // ml: `${DRAWER_WIDTH}px`,
                mt: ['48px', '56px', '64px'],
                p: 3,
              }}
            >
              {children}
            </Box>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  )
}
