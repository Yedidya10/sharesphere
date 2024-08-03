'use client'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import EditProfileButton from '../buttons/editProfileButton/EditProfileButton'

export interface IUserInfo {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the UserInfo be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * UserInfo contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const UserInfo: React.FC<IUserInfo> = ({
  primary = false,
  label,
  ...props
}) => {
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [userInfo, setUserInfo] = useState<any>(undefined)

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        setUserInfo(data.user)
      } else {
        console.error('Failed to find user:', data)
      }
    }

    if (session?.user?.id) {
      getUserInfo()
    }
  }, [session?.user?.id])

  return (
    <>
      {status === 'loading' && <CircularProgress />}
      {status === 'authenticated' && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">User Info</Typography>
            <EditProfileButton label={''} />
          </Box>
          <Box
            sx={{
              padding: '1rem',
              display: 'flex',
              gap: '3rem',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: '100px',
                width: '100px',
              }}
            >
              <Image
                src={userInfo?.image || '/images/placeholder.png'}
                alt={userInfo?.firstName}
                fill={true}
                style={{
                  borderRadius: '50%',
                }}
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
              }}
            >
              <Typography>
                {userInfo?.firstName} {userInfo?.lastName}
              </Typography>
              <Typography>Email: {userInfo?.email}</Typography>
              <Typography>Phone: {userInfo?.phone}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '1rem',
                }}
              >
                <Typography>Address:</Typography>
                {userInfo?.address && (
                  <Typography>
                    {userInfo?.address.streetName}{' '}
                    {userInfo?.address.streetNumber}
                    {', '}
                    {userInfo?.address.city} {userInfo?.address.country}{' '}
                    {userInfo?.address.zipCode}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default UserInfo
