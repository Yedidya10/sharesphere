'use client'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Info from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'

const handleOpenModal = (id: number) => {
  console.log(id)
}

const handleEditUser = (id: number) => {
  console.log(id)
}

const handleDeleteUser = (id: number) => {
  console.log(id)
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'thumbnail',
    headerName: 'Image',
    width: 70,
    renderCell: (params: GridRenderCellParams) => (
      <img
        src={params.row.thumbnailUrl || '/default-thumbnail.png'} // Provide a default thumbnail URL
        alt={`Thumbnail for ${params.row.firstName} ${params.row.lastName}`}
        style={{
          width: 50,
          height: 50,
          objectFit: 'cover',
          borderRadius: '50%',
          padding: '5px',
        }}
      />
    ),
  },
  { field: 'firstName', headerName: 'First name', hideable: false },
  { field: 'lastName', headerName: 'Last name', hideable: false },
  { field: 'country', headerName: 'Country' },
  { field: 'language', headerName: 'Language', width: 80 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 70,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,

    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 140,
    renderCell: (params: GridRenderCellParams) => (
      <div>
        <IconButton
          aria-label="Info"
          onClick={() => handleOpenModal(params.row.id)}
        >
          <Info />
        </IconButton>
        <IconButton
          aria-label="Edit"
          onClick={() => handleEditUser(params.row.id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => handleDeleteUser(params.row.id)}
        >
          <Delete />
        </IconButton>
      </div>
    ),
  },
]

const rows = [
  {
    id: 1,
    country: 'Israel',
    language: 'he-IL',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/86730512?v=4',
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
  },
  {
    id: 2,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
  },
  {
    id: 3,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Lannister',
    firstName: 'Jaime',
    age: 45,
  },
  {
    id: 4,
    country: 'USA',
    language: 'en-US',
    lastName: 'Stark',
    firstName: 'Arya',
    age: 16,
  },
  {
    id: 5,
    country: 'USA',
    language: 'en-US',
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: null,
  },
  {
    id: 6,
    country: 'USA',
    language: 'en-US',
    lastName: 'Melisandre',
    firstName: null,
    age: 150,
  },
  {
    id: 7,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Clifford',
    firstName: 'Ferrara',
    age: 44,
  },
  {
    id: 8,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Frances',
    firstName: 'Rossini',
    age: 36,
  },
  {
    id: 9,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
  },
  {
    id: 10,
    country: 'USA',
    language: 'en-US',
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: null,
  },
  {
    id: 11,
    country: 'USA',
    language: 'en-US',
    lastName: 'Melisandre',
    firstName: null,
    age: 150,
  },
  {
    id: 12,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Clifford',
    firstName: 'Ferrara',
    age: 44,
  },
  {
    id: 13,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Frances',
    firstName: 'Rossini',
    age: 36,
  },
  {
    id: 14,
    country: 'Israel',
    language: 'he-IL',
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
  },
]

export default function UsersPage() {
  return (
    <div style={{ height: 620, width: '100%' }}>
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
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
      />
    </div>
  )
}
