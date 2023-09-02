'use client'

import styles from './AdminDashboardDrawer.module.scss'
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
import { NextLinkComposed } from '@/components/mui/Link'

export interface IAdminDashboardDrawer {
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
   * How large should the AdminDashboardDrawer be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * AdminDashboardDrawer contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const AdminDashboardDrawer: React.FC<IAdminDashboardDrawer> = ({
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
        <ListItemButton component={NextLinkComposed} to="/adminDashboard">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton component={NextLinkComposed} to="/adminDashboard/chats">
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chats" />
        </ListItemButton>

        <ListItemButton component={NextLinkComposed} to="/adminDashboard/users">
          <ListItemIcon>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton component={NextLinkComposed} to="/adminDashboard/cards">
          <ListItemIcon>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText primary="Cards" />
        </ListItemButton>

        <ListItemButton
          component={NextLinkComposed}
          to="/adminDashboard/settings"
        >
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

export default AdminDashboardDrawer
