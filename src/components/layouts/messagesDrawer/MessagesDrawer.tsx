'use client'

import isUserBorrowedItemsExistState from '@/recoils/isUserBorrowedItemsExistState/isUserBorrowedItemsExistState'
import isUserOwnedItemsExistState from '@/recoils/isUserOwnedItemsExistState/isUserOwnedItemsExistState'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { NextLinkComposed } from '@/components/mui/Link'

export interface IMessagesDrawer {
  sampleTextProp: string
  drawerWidth: number
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the MessagesDrawer be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * MessagesDrawer contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const MessagesDrawer: React.FC<IMessagesDrawer> = ({
  primary = false,
  label,
  sampleTextProp,
  drawerWidth,
  ...props
}) => {
  const { lang } = useTranslation('common')
  const isUserOwnedItemsExist = useRecoilValue(isUserOwnedItemsExistState)
  const isUserBorrowedItemsExist = useRecoilValue(isUserBorrowedItemsExistState)

  const dir = () => {
    if (lang === 'he') {
      return 'rtl'
    } else {
      return 'ltr'
    }
  }

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: ['48px', '56px', '64px'],
          height: 'auto',
          bottom: 0,
          zIndex: 1,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemButton component={NextLinkComposed} to="/messages">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MessagesDrawer
