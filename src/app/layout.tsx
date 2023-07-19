import './globals.scss'
import { Inter } from 'next/font/google'
import { Session } from 'next-auth'
import { headers } from 'next/headers'
import AuthProvider from './AuthProvider'
import Header from '@/components/layouts/headerLayout/header/Header'
import useTranslation from 'next-translate/useTranslation'
import clientPromise from '../lib/mongodb'
import * as React from 'react'
import { Roboto } from 'next/font/google'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SettingsIcon from '@mui/icons-material/Settings'
import SupportIcon from '@mui/icons-material/Support'
import LogoutIcon from '@mui/icons-material/Logout'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

const DRAWER_WIDTH = 240

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Starred', href: '/starred', icon: StarIcon },
  { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
]

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
]

export const metadata = {
  title: 'Create Next App',
  description: 'Scalable Next.js Project Template',
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession(headers().get('cookie') ?? '')
  const { lang } = useTranslation('common')


  const dir = () => {
    if (lang === 'he') {
      return 'rtl'
    } else {
      return 'ltr'
    }
  }

  return (
    <html lang={lang} dir={dir()}>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeRegistry>
          <Header sampleTextProp={''} label={''}/>
            <Drawer
              sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: DRAWER_WIDTH,
                  boxSizing: 'border-box',
                  top: ['48px', '56px', '64px'],
                  height: 'auto',
                  bottom: 0,
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Divider />
              <List>
                {LINKS.map(({ text, href, icon: Icon }) => (
                  <ListItem key={href} disablePadding>
                    <ListItemButton component={Link} href={href}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ mt: 'auto' }} />
              <List>
                {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                ml: `${DRAWER_WIDTH}px`,
                mt: ['48px', '56px', '64px'],
                p: 3,
              }}
            >
              <Header sampleTextProp={'sampleTextProp'} label={''} />
              {children}
            </Box>
          </ThemeRegistry>
        </AuthProvider>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBOr4Nn2N3YzEa2FgTBVt5P_YzmM3-AGR4&libraries=places`}
        ></script>
      </body>
    </html>
  )
}
