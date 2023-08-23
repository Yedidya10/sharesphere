// export { default } from "next-auth/middleware"
// export const config = { matcher: ["/dashboard"] }
import createMiddleware from 'next-intl/middleware'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'he'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'he',
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
