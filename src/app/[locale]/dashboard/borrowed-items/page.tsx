import CurrentUserBorrowedItems from '@/components/cards/currentUserBorrowedItems/CurrentUserBorrowedItems'
import Box from '@mui/material/Box'
import { Session } from 'next-auth'
import { unstable_setRequestLocale } from 'next-intl/server'
import { headers } from 'next/headers'

// fetch session from server
async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  )

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

// fetch user borrowed items from server
async function getUserBorrowedItems() {
  const session = await getSession(headers().get('cookie') ?? '')
  const BASE_URL = process.env.NEXT_PUBLIC_URL
  const userId = session.user.id

  try {
    const response = await fetch(
      `${BASE_URL}/api/cards/userId/${userId}/borrowed`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (response.status === 404) {
      // Return an empty array if no user items are found
      return []
    }

    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error('Failed to fetch user borrowed items')
    }

    return data.cards
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default async function BorrowedItemsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  const userBorrowedItems = await getUserBorrowedItems()
  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <CurrentUserBorrowedItems
        sampleTextProp={''}
        userBorrowedItems={userBorrowedItems}
        label={''}
      />
    </Box>
  )
}
