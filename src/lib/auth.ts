import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import clientPromise from '@/lib/mongodb'
import { User } from '@/models/dbModels'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { Adapter } from 'next-auth/adapters'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import type { IUser } from '@/models/UserModel'

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

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  adapter: <Adapter>MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: getCredentials('GOOGLE').clientId,
      clientSecret: getCredentials('GOOGLE').clientSecret,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return Promise.resolve({
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          role: 'user', // Default role
          email: profile.email,
          phone: undefined,
          image: profile.picture,
          address: {},
          lastLogin: new Date(),
          updatedAt: new Date(),
          createdAt: new Date(),
        })
      },
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
      session.user.id = user.id
      session.user.firstName = user.firstName
      session.user.lastName = user.lastName
      session.user.role = user.role

      return Promise.resolve(session)
    },
  },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}
