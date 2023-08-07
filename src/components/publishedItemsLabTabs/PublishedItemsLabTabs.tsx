'use client'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Unstable_Grid2'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import * as React from 'react'

export interface IPublishedItemsLabTabs {
  sampleTextProp: string
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
  sampleTextProp,
  ...props
}) => {
  const [value, setValue] = React.useState('1')
  const { data: session, status } = useSession()
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const [isOwner, setIsOwner] = React.useState<boolean | null>(null)
  const [currentUserCards, setCurrentUserCards] = React.useState([])

  React.useEffect(() => {
    const currentUserId = session?.user?.id

    // async function getCurrentUserCards() {
    //   try {
    //     const response = await fetch(`/api/cards/${currentUserId}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     const data = await response.json()

    //     if (response.ok) {
    //       console.log(data)
    //       return setCurrentUserCards(data)
    //     } else {
    //       throw new Error(data.error || 'Failed to fetch cards')
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // getCurrentUserCards()

    console.log(currentUserCards)
  }, [])

  React.useEffect(() => {
    const currentUserId = session?.user?.id
    currentUserId ? setIsOwner(true) : setIsOwner(false)
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pending publication" value="1" />
            <Tab label="Published" value="2" />
            <Tab label="Pending response" value="3" />
            <Tab label="For a loan soon" value="4" />
            <Tab label="On loan" value="5"></Tab>
            <Tab label="Late loan" value="6" disabled />
            <Tab label="History" value="8" />
            <Tab label="On hold" value="9" />
            <Tab label="Deleted" value="10" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            paddingInline: 0,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              xs={12}
              sx={{
                height: 160,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    xs={12}
                    md={3}
                    sx={{
                      height: '100%',
                      width: 'auto',
                      position: 'relative',
                      paddingInline: 2,
                    }}
                  >
                    <Image
                      src="/images/placeholder.png"
                      alt={''}
                      width={80}
                      height={120}
                    />
                  </Grid>
                  <Grid xs={12} md={9}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      ></Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* {status === 'authenticated' && isOwner && (
                  <CardActions>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          // Add your deletion logic here
                          console.log('Item deleted')
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          // Add your deletion logic here
                          console.log('Item Edit')
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                )} */}
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default PublishedItemsLabTabs
