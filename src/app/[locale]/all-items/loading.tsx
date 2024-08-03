import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const skeletonArray = Array.from({ length: 10 })

const skeletonItem = (
  <Stack spacing={1}>
    <Skeleton variant="rectangular" height={200} />
    <Skeleton
      variant="rounded"
      width={100}
      height={20}
      sx={{
        borderRadius: '1rem',
      }}
    />
    <Skeleton variant="text" width={140} height={35} />
    <Skeleton variant="text" height={25} />
    <Skeleton variant="text" height={25} />
    <Skeleton variant="text" height={25} />
    <Skeleton variant="text" width={'80%'} height={25} />
  </Stack>
)

export default function Loading() {
  return (
    <Grid container rowSpacing={0} columnSpacing={2} columns={30}>
      {skeletonArray.slice(0, 10).map((_, index) => (
        <Grid key={index} xs={15} mb={7.5} sm={10} lg={6}>
          {skeletonItem}
        </Grid>
      ))}
    </Grid>
  )
}
