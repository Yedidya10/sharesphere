import AuthProvider from '@/components/AuthProvider'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Header from '@/components/layouts/header/Header'
import { locales } from '@/navigation'
import Box from '@mui/material/Box'
import { Session } from 'next-auth'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter, Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import * as React from 'react'
import './globals.scss'

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  )

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

  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
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
      <Box component="body" className={inter.className}>
        <AuthProvider session={session}>
          <ThemeRegistry locale={locale}>
            <Header sampleTextProp={''} label={''} />
            <Box
              component="main"
              sx={{
                width: '100%',
                color: 'text.primary',
                bgcolor: 'background.default',
                minHeight: 'calc(100vh - 64px)',
                flexGrow: 1,
                mt: '64px',
              }}
            >
              {children}
              {/* <CookiesConsentBanner label="I understand" /> */}
            </Box>
          </ThemeRegistry>
        </AuthProvider>
      </Box>
    </html>
  )
}
