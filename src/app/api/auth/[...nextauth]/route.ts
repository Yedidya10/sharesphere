import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

// Check if the environment variables are set
function getCredentials(providerName: string) {
  const clientId = process.env[`${providerName}_CLIENT_ID`]
  const clientSecret = process.env[`${providerName}_CLIENT_SECRET`]

  if (!clientId || clientId.length === 0) {
    throw new Error(`Missing ${providerName}_CLIENT_ID`)
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error(`Missing ${providerName}_CLIENT_SECRET`)
  }

  return { clientId, clientSecret }
}

export const authOptions: AuthOptions = {
  adapter: <Adapter>MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: getCredentials('GOOGLE').clientId,
      clientSecret: getCredentials('GOOGLE').clientSecret,
    }),
    FacebookProvider({
      clientId: getCredentials('FACEBOOK').clientId,
      clientSecret: getCredentials('FACEBOOK').clientSecret,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/register' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // The `session` callback is called when a new session is created or updated
    session: async ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
