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
  const [userData, setUserData] = useState<any>(undefined)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/users/${session?.user?.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        setUserData(data.user)
      } catch (error) {
        console.error('Failed to fetch user', error)
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
            <EditProfileButton userData={userData} label={''} />
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
                src={
                  userData?.image ||
                  'https://images.freeimages.com/vhq/images/previews/715/generic-profile-image-placeholder-suit-118559.png'
                }
                alt={userData?.firstName}
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
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography>Email: {userData?.email}</Typography>
              <Typography>Phone: {userData?.phone}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '1rem',
                }}
              >
                <Typography>Address:</Typography>
                {userData?.address && (
                  <Typography>
                    {userData?.address.streetName}{' '}
                    {userData?.address.streetNumber}
                    {', '}
                    {userData?.address.city} {userData?.address.country}{' '}
                    {userData?.address.zipCode}
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
