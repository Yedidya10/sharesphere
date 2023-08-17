'use client'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Tooltip from '@mui/material/Tooltip'
import { useSession } from 'next-auth/react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'

export interface IBorrowedItemsLabTabs {
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
   * How large should the BorrowedItemsLabTabs be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * BorrowedItemsLabTabs contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const BorrowedItemsLabTabs: React.FC<IBorrowedItemsLabTabs> = ({
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
 
  React.useEffect(() => {
    const currentUserId = session?.user?.id
    currentUserId ? setIsOwner(true) : setIsOwner(false)
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
            <Tab label="Pending response" value="2" />
            <Tab label="Rejected" value="3" disabled />
            <Tab label="History" value="4"></Tab>
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
              {}
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
        <TabPanel
          value="2"
          sx={{
            paddingInline: 0,
          }}
        >
          Item Two
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            paddingInline: 0,
          }}
        >
          Item Three
        </TabPanel>
        <TabPanel
          value="4"
          sx={{
            paddingInline: 0,
          }}
        >
          Item Four
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default BorrowedItemsLabTabs
