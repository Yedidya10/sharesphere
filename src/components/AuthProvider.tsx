'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

export interface AuthContextProps {
  children: React.ReactNode
  session: Session
}

export default function AuthProvider({ children }: AuthContextProps) {
  return <SessionProvider refetchInterval={5 * 60}>{children}</SessionProvider>
}
