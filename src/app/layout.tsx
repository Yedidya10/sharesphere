// import 'rsuite/dist/rsuite.min.css'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Header from '@/components/layouts/headerLayout/header/Header'
import Box from '@mui/material/Box'
import { Session } from 'next-auth'
import useTranslation from 'next-translate/useTranslation'
import { Inter, Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import * as React from 'react'
import AuthProvider from '../components/AuthProvider'
import './globals.scss'

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
                mt: ['48px', '56px', '70px'],
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
