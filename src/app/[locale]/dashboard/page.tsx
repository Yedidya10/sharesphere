import ItemsPendingRequestsList from '@/components/itemsPendingRequestsList/ItemsPendingRequestsList'
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

// fetch user items from database
async function getPendingRequestsItems() {
  const session = await getSession(headers().get('cookie') ?? '')
  const BASE_URL = process.env.NEXT_PUBLIC_URL
  const userId = session.user.id

  try {
    const response = await fetch(
      `${BASE_URL}/api/cards/userId/${userId}/ownedCards/pendingRequests`,
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
      throw new Error('Failed to fetch user items')
    }

    return data.cards
  } catch (error: any) {
    console.error('Error fetching user items:', error.message)
  }
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  const pendingRequestsItems = await getPendingRequestsItems()

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        width: '100%',
      }}
    >
      {pendingRequestsItems.length > 0 && (
        <ItemsPendingRequestsList
          primary={true}
          label="ItemsPendingRequestsList"
          sampleTextProp="sampleTextProp"
          pendingRequestsItems={pendingRequestsItems}
        />
      )}
    </Box>
  )
}
