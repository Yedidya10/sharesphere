'use client'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Info from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { User } from '@/utils/types/user'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'

export interface IUsersDataGrid {
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
   * How large should the UsersDataGrid be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * UsersDataGrid contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const handleOpenModal = (id: number) => {
  console.info('Opening modal for user with id:', id)
}

const handleEditUser = (id: number) => {
  console.info('Editing user with id:', id)
}

const handleDeleteUser = (id: number) => {
  console.info('Deleting user with id:', id)
}

const UsersDataGrid: React.FC<IUsersDataGrid> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [allUsers, setAllUsers] = useState<User[]>([])

  // TODO: Fetch all users in server component
  useEffect(() => {
    async function fetchAllCards() {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        const users = data.users

        if (response.ok) {
          setAllUsers(users)
          return
        } else {
          throw new Error(users.error || 'Failed to fetch cards')
        }
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setIsLoading(false) // Set loading state to false after fetching
      }
    }
    fetchAllCards()
  }, [])

  const columns: GridColDef[] = [
    {
      field: 'userId',
      headerName: 'ID',
      width: 220,
    },
    {
      field: 'thumbnailUrl',
      headerName: 'Thumbnail',
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <Image
          src={params.row.thumbnailUrl}
          alt={`Thumbnail for ${params.row.itemName}`}
          width={50}
          height={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
            padding: '5px',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.05)',
          }}
        />
      ),
    },
    { field: 'firstName', headerName: 'First name', hideable: false },
    { field: 'lastName', headerName: 'Last name', hideable: false },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'language', headerName: 'Language', width: 80 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 70,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
    },
  ]

  const rows = allUsers.map((user) => {
    const userAddress =
      user.address !== undefined
        ? `${user.address.streetName} ${user.address.streetNumber}, ${user.address.city}, ${user.address.zipCode}, ${user.address.country}`
        : ''
    return {
      id: user._id,
      thumbnailUrl: user.image,
      email: user.email,
      role: user.role,
      address: userAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  })

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      slots={{
        toolbar: GridToolbar,
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
        columns: {
          columnVisibilityModel: {
            // hide the id column
            userId: false,
          },
        },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      checkboxSelection
      disableRowSelectionOnClick
      loading={isLoading}
    />
  )
}

export default UsersDataGrid
