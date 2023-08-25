'use client'

import isUserBorrowedItemsExistState from '@/recoils/isUserBorrowedItemsExistState/isUserBorrowedItemsExistState'
import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useRecoilState } from 'recoil'
import UserBorrowedCardInfo from '../userBorrowedCardInfo/UserBorrowedCardInfo'

export interface ICurrentUserBorrowedCards {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the CurrentUserBorrowedCards be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CurrentUserBorrowedCards contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const CurrentUserBorrowedCards: React.FC<ICurrentUserBorrowedCards> = ({
  primary = false,
  label,
  ...props
}) => {
  const [value, setValue] = React.useState('1')
  const { data: session, status } = useSession()

  const [isOwner, setIsOwner] = React.useState<boolean | null>(null)
  const [currentUserCards, setCurrentUserBorrowedCards] = React.useState<
    ItemCoreWithLoanDetails[] | null
  >(null)
  const [isUserBorrowedItemsExist, setIsUserBorrowedItemsExist] =
    useRecoilState(isUserBorrowedItemsExistState)

  async function getCurrentUserBorrowedCards() {
    try {
      const response = await fetch(
        `/api/cards/userId/${session?.user?.id}/borrowedCards`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()
      const cards = data.cards

      console.log('data', data)
      console.log('cards', cards)

      if (response.ok) {
        setIsUserBorrowedItemsExist(true)
        return setCurrentUserBorrowedCards(cards)
      }

      if (response.status === 404) {
        return setIsUserBorrowedItemsExist(false)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  React.useEffect(() => {
    if (session?.user?.id !== undefined && session?.user?.id !== null) {
      getCurrentUserBorrowedCards()
    }
  }, [session?.user?.id])

  React.useEffect(() => {
    if (session?.user?.id) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [session?.user?.id])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Active" value="1" />
            <Tab label="Ends soon" value="2" disabled={true} />
            <Tab label="Late" value="3" disabled={true} />
            <Tab label="History" value="4" disabled={true} />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map((card) => (
              <Grid
                // @ts-ignore
                key={card._id}
                xs={12}
                sx={{
                  height: 'max-content',
                }}
              >
                <UserBorrowedCardInfo
                  card={card}
                  label={''}
                  extendButton={true}
                  returnButton={true}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map((card) => {
              // Get today's date
              const currentDate = new Date()

              // Check if card has currentBorrower and endDate is valid
              if (card.currentBorrower?.endDate) {
                // Calculate the date that is 2 days before endDate
                const endDate = new Date(card.currentBorrower.endDate)
                const twoDaysBeforeEndDate = new Date(endDate)
                twoDaysBeforeEndDate.setDate(endDate.getDate() - 2)

                // Check if currentDate is within the last 2 days before endDate
                if (
                  currentDate >= twoDaysBeforeEndDate &&
                  currentDate <= endDate
                ) {
                  return (
                    <Grid
                      // @ts-ignore
                      key={card._id}
                      xs={12}
                      sx={{
                        height: 'max-content',
                      }}
                    >
                      <UserBorrowedCardInfo
                        card={card}
                        label={''}
                        extendButton={true}
                        returnButton={true}
                      />
                    </Grid>
                  )
                }
              }
              return null // Return null for cards that don't meet the condition
            })}
          </Grid>
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map((card) => {
              // Get today's date
              const currentDate = new Date()

              // Check if card has currentBorrower and endDate is valid
              if (card.currentBorrower?.endDate) {
                // Calculate the date that is 2 days before endDate
                const endDate = new Date(card.currentBorrower.endDate)

                // Check if currentDate is after endDate
                if (currentDate > endDate) {
                  return (
                    <Grid
                      // @ts-ignore
                      key={card._id}
                      xs={12}
                      sx={{
                        height: 'max-content',
                      }}
                    >
                      <UserBorrowedCardInfo
                        card={card}
                        label={''}
                        extendButton={true}
                        returnButton={true}
                      />
                    </Grid>
                  )
                }
              }
              return null // Return null for cards where the date hasn't passed
            })}
          </Grid>
        </TabPanel>
        <TabPanel
          value="4"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map((card) => (
              <Grid
                // @ts-ignore
                key={card._id}
                xs={12}
                sx={{
                  height: 'max-content',
                }}
              >
                <Box>
                  <UserBorrowedCardInfo
                    card={card}
                    label={''}
                    extendButton={false}
                    returnButton={false}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default CurrentUserBorrowedCards
