import './globals.scss'
import { Inter } from 'next/font/google'

import useTranslation from 'next-translate/useTranslation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Scalable Next.js Project Template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation('common')

  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
