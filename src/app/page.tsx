import MediaCard from '@/components/mediaCard/MediaCard'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import useTranslation from 'next-translate/useTranslation'
import Cards from '@/components/cards/Cards'

export default function Home() {
  const { t } = useTranslation('home')
  const example = t('variable-example', { count: 42 })

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box>
        <Alert severity="warning" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hello 👋</AlertTitle>
          This app is in beta version. To report malfunctions and suggestions
          click here
        </Alert>
        {/* <Cards label={''} /> */}
      </Box>
    </Box>
  )
}
