import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CurrentUserOwnedCards from '@/components/cards/currentUserOwnedCards/CurrentUserOwnedCards'
import Box from '@mui/material/Box'
import { getServerSession } from 'next-auth/next'
import { unstable_setRequestLocale } from 'next-intl/server'

const BASE_URL = process.env.NEXT_PUBLIC_URL

// fetch user items from database
async function getUserOwnedItems() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  try {
    const response = await fetch(
      `${BASE_URL}/api/cards/userId/${userId}/ownedCards`,
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
    throw new Error(error.message)
  }
}

export default async function MyItemsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  const userOwnedItems = await getUserOwnedItems()

  return (
    <Box
      sx={{
        width: '100%',
        m: 'auto',
      }}
    >
      <CurrentUserOwnedCards
        sampleTextProp={''}
        label={''}
        userOwnedItems={userOwnedItems}
      />
    </Box>
  )
}
