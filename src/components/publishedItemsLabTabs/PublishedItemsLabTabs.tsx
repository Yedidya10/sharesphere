'use client'

import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Unstable_Grid2'
import * as React from 'react'
import ProfileCardInfo from '../cards/profileCardInfo/ProfileCardInfo'

export interface IPublishedItemsLabTabs {
  currentUserCards: ItemCoreWithLoanDetails[] | null
  isOwner: boolean
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the PublishedItemsLabTabs be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * PublishedItemsLabTabs contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const PublishedItemsLabTabs: React.FC<IPublishedItemsLabTabs> = ({
  primary = false,
  label,
  isOwner,
  currentUserCards,
  ...props
}) => {
  const [value, setValue] = React.useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
            variant="fullWidth"
            sx={{ bgcolor: 'background.paper' }}
          >
            <Tab label="Pending response" value="1" />
            <Tab label="For a loan soon" value="2" />
            <Tab label="On loan" value="3"></Tab>
            <Tab label="Late loan" value="4" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map(
              (card) =>
                card.status === 'pendingResponse' && (
                  <Grid
                    // @ts-ignore
                    key={card._id}
                    xs={12}
                    sx={{
                      height: 'max-content',
                    }}
                  >
                    <ProfileCardInfo
                      card={card}
                      isOwner={isOwner!}
                      isAvailable={true}
                      label={''}
                      activeButton={true}
                      deleteButton={true}
                      editButton={true}
                      restoreButton={false}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map(
              (card) =>
                card.status === 'forALoanSoon' && (
                  <Grid
                    // @ts-ignore
                    key={card._id}
                    xs={12}
                    sx={{
                      height: 'max-content',
                    }}
                  >
                    <ProfileCardInfo
                      card={card}
                      isOwner={isOwner!}
                      isAvailable={true}
                      label={''}
                      activeButton={false}
                      deleteButton={true}
                      editButton={true}
                      restoreButton={false}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map(
              (card) =>
                card.status === 'onLoan' && (
                  <Grid
                    // @ts-ignore
                    key={card._id}
                    xs={12}
                    sx={{
                      height: 'max-content',
                    }}
                  >
                    <ProfileCardInfo
                      card={card}
                      isOwner={isOwner!}
                      isAvailable={true}
                      label={''}
                      activeButton={true}
                      deleteButton={true}
                      editButton={true}
                      restoreButton={false}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </TabPanel>
        <TabPanel
          value="4"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            {currentUserCards?.map(
              (card) =>
                card.status === 'lateLoan' && (
                  <Grid
                    // @ts-ignore
                    key={card._id}
                    xs={12}
                    sx={{
                      height: 'max-content',
                    }}
                  >
                    <ProfileCardInfo
                      card={card}
                      isOwner={isOwner!}
                      isAvailable={true}
                      label={''}
                      activeButton={true}
                      deleteButton={true}
                      editButton={true}
                      restoreButton={false}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default PublishedItemsLabTabs
