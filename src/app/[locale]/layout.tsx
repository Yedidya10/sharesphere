import { useLocale } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Header from '@/components/layouts/header/Header'
import Box from '@mui/material/Box'
import { Session } from 'next-auth'
import { Inter, Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import * as React from 'react'
import AuthProvider from '@/components/AuthProvider'
import './globals.scss'
import CookiesConsentBanner from '@/components/cookiesConsentBanner/CookiesConsentBanner'
import { locales } from '@/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

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
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await getSession(headers().get('cookie') ?? '')

  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  unstable_setRequestLocale(locale)

  const dir = () => {
    if (locale === 'he') {
      return 'rtl'
    } else {
      return 'ltr'
    }
  }

  return (
    <html lang={locale} dir={dir()}>
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
              <CookiesConsentBanner label="I understand" />
            </Box>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  )
}
