'use client'

import { NextLinkComposed } from '@/components/mui/Link'
import isUserBorrowedItemsExistState from '@/recoils/isUserBorrowedItemsExistState/isUserBorrowedItemsExistState'
import isUserOwnedItemsExistState from '@/recoils/isUserOwnedItemsExistState/isUserOwnedItemsExistState'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChecklistIcon from '@mui/icons-material/Checklist'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import SettingsIcon from '@mui/icons-material/Settings'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { useRecoilValue } from 'recoil'

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
  const isUserOwnedItemsExist = useRecoilValue(isUserOwnedItemsExistState)
  const isUserBorrowedItemsExist = useRecoilValue(isUserBorrowedItemsExistState)

  const [open, setOpen] = React.useState(true)
  const pathnames = usePathname()
  const pathnamesWithoutLocale = pathnames.substring(pathnames.indexOf('/', 1))

  const locale = useLocale()
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
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="dashboard-list-nav"
      >
        <ListItemButton
          component={NextLinkComposed}
          to="/dashboard"
          selected={pathnamesWithoutLocale === '/dashboard'}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          component={NextLinkComposed}
          to="/dashboard/profile"
          selected={pathnamesWithoutLocale === '/dashboard/profile'}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
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
            <ListItemButton
              sx={{ paddingInlineStart: 4 }}
              component={NextLinkComposed}
              to="/dashboard/borrowed-items"
              // disabled={!isUserBorrowedItemsExist}
              selected={pathnamesWithoutLocale === '/dashboard/borrowed-items'}
            >
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Borrowed items" />
            </ListItemButton>
            <ListItemButton
              sx={{ paddingInlineStart: 4 }}
              component={NextLinkComposed}
              to="/dashboard/my-items"
              // disabled={isUserOwnedItemsExist}
              selected={pathnamesWithoutLocale === '/dashboard/your-items'}
            >
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="My items" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          component={NextLinkComposed}
          to="/dashboard/settings"
          selected={pathnamesWithoutLocale === '/dashboard/settings'}
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

export default DashboardDrawer
