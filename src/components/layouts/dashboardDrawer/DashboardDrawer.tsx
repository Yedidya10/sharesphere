'use client'

import styles from './DashboardDrawer.module.scss'
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChecklistIcon from '@mui/icons-material/Checklist'
import ChatIcon from '@mui/icons-material/Chat'

export interface IDashboardDrawer {
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
   * How large should the DashboardDrawer be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * DashboardDrawer contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const DashboardDrawer: React.FC<IDashboardDrawer> = ({
  primary = false,
  label,
  sampleTextProp,
  drawerWidth,
  ...props
}) => {
  const { lang } = useTranslation('common')

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
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="dashboard-list-nav"
      >
        <ListItemButton href="/dashboard/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton href="/dashboard/chats">
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chats" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} href="/dashboard/borrowed-items">
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Borrowed items" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} href="/dashboard/your-items">
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Your items" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton href="/dashboard/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>

      <Divider sx={{ mt: 'auto' }} />
    </Drawer>
  )
}

export default DashboardDrawer
