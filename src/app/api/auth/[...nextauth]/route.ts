import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import { config } from '@/lib/auth'

export const authOptions: NextAuthOptions = {
  ...config,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// export default NextAuth(authOptions)
