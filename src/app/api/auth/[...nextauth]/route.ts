import clientPromise from '@/lib/mongodb'
import { User } from '@/models/dbModels'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
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
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { type: 'text' },
    //     password: { type: 'password' },
    //   },
    //   authorize(credentials) {
    //     if (
    //       credentials?.username === 'admin' &&
    //       credentials.password === 'admin'
    //     ) {
    //       return { id: '1', name: 'admin' }
    //     }

    //     return null
    //   },
    // }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/register', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // events: {
  //   signIn: async ({ user, account, profile, isNewUser }) => {
  //     console.log('signIn', user, account, profile, isNewUser)
  //   },
  //   signOut: async ({ session }) => {
  //     console.log('signOut', session)
  //   },
  //   createUser: async ({ user }) => {
  //     console.log('createUser', user)
  //   },
  //   linkAccount: async ({ user, account, profile }) => {
  //     console.log('linkAccount', user, account, profile)
  //   },
  //   session: async ({ session }) => {
  //     console.log('session', session)
  //   },
  // },
  callbacks: {
    //  The `redirect` callback is called when a user is redirected from
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
    },
    // The `session` callback is called when a new session is created or updated
    session: async ({ session, user }) => {
      const dbUser = await User.findOneAndUpdate(
        { email: user.email },
        { role: 'user' }, // Set the user's role to 'user'
        { new: true }
      )
      return {
        ...session,
        user: { ...session.user, role: dbUser.role, id: dbUser._id },
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
