import createMiddleware from 'next-intl/middleware'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'he']
const publicPages = ['/', '/auth/login', '/all-items', '/dashboard/']

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`) unless if `localePrefix` is set to `always`
  defaultLocale: 'he',
  localePrefix: 'always',
})

// const authMiddleware = withAuth(
//   // Note that this callback is only invoked if
//   // the `authorized` callback has returned `true`
//   // and not for pages listed in `pages`.
//   function onSuccess(req) {
//     return intlMiddleware(req)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token != null,
//     },
//     pages: {
//       signIn: '/auth/login',
//     },
//   }
// )

// export default function middleware(req: NextRequest) {
//   const publicPathnameRegex = RegExp(
//     `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
//     'i'
//   )
//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

//   if (isPublicPage) {
//     return intlMiddleware(req)
//   } else {
//     return (authMiddleware as any)(req)
//   }
// }

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
