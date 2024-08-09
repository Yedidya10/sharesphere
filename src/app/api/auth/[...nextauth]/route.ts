import clientPromise from '@/lib/mongodb'
import { User } from '@/models/dbModels'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
// import { createTransport } from 'nodemailer'
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
      allowDangerousEmailAccountLinking: true,
    }),
    // FacebookProvider({
    //   clientId: getCredentials('FACEBOOK').clientId,
    //   clientSecret: getCredentials('FACEBOOK').clientSecret,
    // }),
    /* Once there is a domain, it will be possible to define this provider.
      https://authjs.dev/guides/providers/email
      https://nodemailer.com/about/#example */
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
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
    // The `session` callback is called when a new session is created or updated
    session: async ({ session, user }) => {
      const userFirstName = user.name ? user.name.split(' ')[0] : ''
      const userLastName = user.name ? user.name.split(' ')[1] : ''
      const dbUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          lastLogin: new Date(),
          firstName: userFirstName,
          lastName: userLastName,
          role: 'user',
        }, // Set the user's role to 'user'
        { new: true } // Return the updated user
      )

      return {
        ...session,
        user: {
          ...session.user,
          role: dbUser.role,
          id: dbUser._id,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
        },
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
