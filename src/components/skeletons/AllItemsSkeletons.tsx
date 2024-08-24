'use client'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Unstable_Grid2'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const AllItemsSkeletons = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [itemsPerRow, setItemsPerRow] = useState(2)

  // Media queries to determine how many items fit in a row
  const isXl = useMediaQuery(theme.breakpoints.up('xl')) // Extra large screens
  const isLg = useMediaQuery(theme.breakpoints.up('lg')) // Large screens
  const isMd = useMediaQuery(theme.breakpoints.up('md')) // Medium screens
  const isSm = useMediaQuery(theme.breakpoints.up('sm')) // Small screens
  const isXs = useMediaQuery(theme.breakpoints.up('xs')) // Extra small screens
  const isMds = useMediaQuery(theme.breakpoints.up('mds')) // Medium small screens
  const isXxs = useMediaQuery(theme.breakpoints.up('xxs')) // Extra extra small screens
  const isXsm = useMediaQuery(theme.breakpoints.up('xsm')) // Extra small medium screens

  // Determine items per row based on screen size
  useEffect(() => {
    if (isXl || isLg) setItemsPerRow(5)
    else if (isMd) setItemsPerRow(4)
    else if (isSm || isXs) setItemsPerRow(2)
    else setItemsPerRow(1) // Fallback

    setLoading(false) // Set loading to false after determining itemsPerRow
  }, [isXl, isLg, isMd, isSm, isXs])

  const rowsToRender = 2 // Adjust this to determine how many rows of skeletons you want to show
  const skeletonCount = itemsPerRow * rowsToRender // Total number of skeletons to render

  const skeletonItem = (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton
        variant="rounded"
        width={100}
        height={20}
        sx={{ borderRadius: '1rem' }}
      />
      <Skeleton variant="text" width={140} height={35} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" width={'80%'} height={25} />
    </Stack>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container rowSpacing={2} columnSpacing={2}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Grid key={index} xs={12 / itemsPerRow}>
              {skeletonItem}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default AllItemsSkeletons
