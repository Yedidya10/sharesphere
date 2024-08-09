'use client'

import * as React from 'react'
import NextAppDirEmotionCacheProvider from './EmotionCache'
import { RecoilRoot } from 'recoil'
import MuiThemeProvider from './MuiThemeProvider'

export default function ThemeRegistry({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  return (
    <NextAppDirEmotionCacheProvider
      options={{ key: locale === 'he' ? 'muirtl' : 'mui' }}
    >
      <RecoilRoot>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </RecoilRoot>
    </NextAppDirEmotionCacheProvider>
  )
}
