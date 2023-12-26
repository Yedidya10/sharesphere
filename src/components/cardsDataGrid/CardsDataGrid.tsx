'use client'

import { ItemCoreWithLoanDetails } from '@/utils/types/Item'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Info from '@mui/icons-material/Info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IconButton from '@mui/material/IconButton'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import SpringModal from '../springModal/SpringModal'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import { Box, Tooltip } from '@mui/material'
import { ca } from 'date-fns/locale'

export interface ICardsDataGrid {
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
   * How large should the CardsDataGrid be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * CardsDataGrid contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const handleEditUser = (id: number) => {
  console.log(id)
}

const handleDeleteUser = (id: number) => {
  console.log(id)
}

const CardsDataGrid: React.FC<ICardsDataGrid> = ({
  primary = false,
  label,
  sampleTextProp,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [allCards, setAllCards] = useState<ItemCoreWithLoanDetails[]>([])
  const [open, setOpen] = useState(false)
  const [selectedCardDetails, setSelectedCardDetails] = useState<
    ItemCoreWithLoanDetails | undefined
  >(undefined)

  useEffect(() => {
    async function fetchAllCards() {
      try {
        const response = await fetch('/api/cards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        const cards = data.cards

        if (response.ok) {
          setAllCards(cards)
          return
        } else {
          throw new Error(cards.error || 'Failed to fetch cards')
        }
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setIsLoading(false) // Set loading state to false after fetching
      }
    }
    fetchAllCards()
  }, [])

  const handleOpenModal = (cardId: number) => {
    const selectedCard = allCards.find(
      (card) => card._id && card._id.toString() === cardId.toString()
    )
    if (selectedCard) {
      setSelectedCardDetails(selectedCard)
      setOpen(true) // Open the modal
    }
  }

  const handleCloseModal = () => {
    setOpen(false) // Close the modal
  }

  const handleApproveCard = async (cardId: number) => {
    try {
      const res = await fetch(`/api/cards/cardId/${cardId}/update/itemStatus`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'published',
        }),
      })
      if (res.ok) {
        // Update the local state with the changed status
        const updatedCards = allCards.map((card) =>
          card._id!.toString() === cardId.toString()
            ? { ...card, status: 'published' }
            : card
        )
        setAllCards(updatedCards)
      } else {
        throw new Error('Failed to approve card')
      }
    } catch (error) {
      console.error('Error approving card:', error)
      // Handle error scenarios
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'cardId',
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
    { field: 'itemName', headerName: 'Item name' },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          icon={
            params.row.status === 'pendingForApproval' ? (
              <Info />
            ) : params.row.status === 'published' ? (
              <CheckCircleIcon />
            ) : (
              <Delete />
            )
          }
          variant="outlined"
          color={
            params.row.status === 'pendingForApproval'
              ? 'warning'
              : params.row.status === 'published'
              ? 'success'
              : 'error'
          }
          label={
            params.row.status === 'pendingForApproval'
              ? 'Pending approval'
              : params.row.status === 'published'
              ? 'Published'
              : 'Inactive'
          }
        />
      ),
    },
    { field: 'mainCategory', headerName: 'Main Category' },
    { field: 'secondaryCategory', headerName: 'Secondary Category' },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ maxWidth: 200 }}>
          <Tooltip title={params.row.description}>
            <Typography component={'p'}>{params.row.description}</Typography>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: 'condition',
      headerName: 'Condition',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.loanPeriod.toString() + ' /5'}>
          <Rating
            name="condition"
            size="small"
            value={params.row.condition}
            readOnly
          />
        </Tooltip>
      ),
    },
    {
      field: 'loanPeriod',
      headerName: 'Loan period',
      renderCell: (params: GridRenderCellParams) => (
        <Typography sx={{ ml: 2 }}>
          {params.row.loanPeriod.toString()} days
        </Typography>
      ),
    },
    { field: 'location', headerName: 'Location', width: 80 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          {params.row.status === 'pendingForApproval' && (
            <IconButton
              aria-label="Approve"
              onClick={() => handleApproveCard(params.row.cardId)}
            >
              <CheckCircleIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Info"
            onClick={() => handleOpenModal(params.row.cardId)}
          >
            <Info />
          </IconButton>
          <IconButton
            aria-label="Edit"
            onClick={() => handleEditUser(params.row.cardId)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => handleDeleteUser(params.row.cardId)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ]

  const rows =
    allCards.length > 0
      ? allCards.map((card: ItemCoreWithLoanDetails) => ({
          id: card._id,
          cardId: card._id,
          itemName: card.details.name,
          mainCategory: card.details.mainCategory,
          secondaryCategory: card.details.secondaryCategory,
          description: card.details.description,
          condition: card.condition,
          loanPeriod: card.maxLoanPeriod,
          location: card.location.city,
          status: card.status,
          thumbnailUrl: card.imageUrl,
        }))
      : []

  return (
    <>
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
              cardId: false,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isLoading}
      />
      <SpringModal
        handleClose={handleCloseModal}
        openModal={open}
        label="Card details"
        keepMounted={true}
      >
        <div>
          {/* Display card details inside the modal */}
          {selectedCardDetails && (
            /* Your modal content here, for example: */
            <div>
              <Typography variant="h5">
                {selectedCardDetails.details.name}
              </Typography>
              <Typography variant="body1">
                Main Category: {selectedCardDetails.details.mainCategory}
              </Typography>
              {/* Display other card details similarly */}
            </div>
          )}
        </div>
      </SpringModal>
    </>
  )
}

export default CardsDataGrid
