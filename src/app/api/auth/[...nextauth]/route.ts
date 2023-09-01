import clientPromise from '@/lib/mongodb'
import { User } from '@/models/dbModels'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
const bcrypt = require('bcryptjs')

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
    // FacebookProvider({
    //   clientId: getCredentials('FACEBOOK').clientId,
    //   clientSecret: getCredentials('FACEBOOK').clientSecret,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        try {
          const user = await User.findOne({ email })
          console.log(user)

          if (!user) {
            throw new Error('No user found with this email')
          }

          const isValid = await bcrypt.compare(password, user.password)

          if (!isValid) {
            throw new Error('Could not log you in')
          }

          return user
        } catch (error: any) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/register', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url)
    },

    // The `session` callback is called when a new session is created or updated
    session: async ({ session, user }) => {
      const dbUser = await User.findOneAndUpdate(
        { email: user.email },
        { role: 'user' }, // Set the user's role to 'user'
        { new: true } // Return the updated user
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
