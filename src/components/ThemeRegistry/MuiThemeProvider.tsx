'use client'

import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import defaultTheme from './theme'
import { useRecoilValue } from 'recoil'
import themeModeState from '@/recoils/themeMode/themeModeState'

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const themeMode = useRecoilValue(themeModeState)

  const theme = React.useMemo(
    () =>
      createTheme({
        ...defaultTheme,
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  )

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
