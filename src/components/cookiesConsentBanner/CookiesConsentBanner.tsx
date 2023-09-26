'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'

export interface ICookiesConsentBanner {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemAlertButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemAlertButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

const CookiesConsentBanner: React.FC<ICookiesConsentBanner> = ({
  primary = false,
  label,
}) => {
  const [cookiesAccepted, setCookiesAccepted] = React.useState({
    preferences: false,
    statistics: false,
    marketing: false,
  })
  const [open, setOpen] = React.useState(true)
  const [openPersonalise, setOpenPersonalise] = React.useState(false)

  const handlePersonalise = () => {
    setOpenPersonalise(true)
  }

  const handleSave = () => {
    setOpen(false)
    setOpenPersonalise(false)
  }

  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCookiesAccepted({
      ...cookiesAccepted,
      preferences: event.target.checked,
    })
    localStorage.setItem(
      'preferencesCookiesAccepted',
      JSON.stringify(event.target.checked)
    )
  }

  const handlePerformanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCookiesAccepted({
      ...cookiesAccepted,
      statistics: event.target.checked,
    })
    localStorage.setItem(
      'statisticsCookiesAccepted',
      JSON.stringify(event.target.checked)
    )
  }

  const handleDecline = () => {
    setCookiesAccepted({
      preferences: false,
      statistics: false,
      marketing: false,
    })
    localStorage.setItem('preferencesCookiesAccepted', JSON.stringify(false))
    localStorage.setItem('statisticsCookiesAccepted', JSON.stringify(false))
    localStorage.setItem('marketingCookiesAccepted', JSON.stringify(false))
    setOpen(false)
  }

  const handleAccept = () => {
    setCookiesAccepted({
      preferences: true,
      statistics: true,
      marketing: true,
    })
    localStorage.setItem('preferencesCookiesAccepted', JSON.stringify(true))
    localStorage.setItem('statisticsCookiesAccepted', JSON.stringify(true))
    localStorage.setItem('marketingCookiesAccepted', JSON.stringify(true))
    setOpen(false)
  }

  React.useEffect(() => {
    const preferencesCookiesAccepted = localStorage.getItem(
      'preferencesCookiesAccepted'
    )
    const statisticsCookiesAccepted = localStorage.getItem(
      'statisticsCookiesAccepted'
    )
    const marketingCookiesAccepted = localStorage.getItem(
      'marketingCookiesAccepted'
    )
    if (preferencesCookiesAccepted) {
      setCookiesAccepted({
        ...cookiesAccepted,
        preferences: JSON.parse(preferencesCookiesAccepted),
      })
    }
    if (statisticsCookiesAccepted) {
      setCookiesAccepted({
        ...cookiesAccepted,
        statistics: JSON.parse(statisticsCookiesAccepted),
      })
    }
    if (marketingCookiesAccepted) {
      setCookiesAccepted({
        ...cookiesAccepted,
        marketing: JSON.parse(marketingCookiesAccepted),
      })
    }
  }, [cookiesAccepted])

  return (
    <>
      {open && (
        <Paper
          role="dialog"
          aria-modal="false"
          aria-label="Cookie banner"
          square
          variant="outlined"
          tabIndex={-1}
          sx={{
            position: 'fixed',
            display: 'flex',
            bottom: 0,
            left: 0,
            right: 0,
            m: 0,
            p: 2,
            borderWidth: 0,
            borderTopWidth: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={12} md={9}>
              <Typography
                component={'h2'}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                This website uses cookies
              </Typography>
              <Typography component={'p'}>
                We use cookies and other technologies to improve your experience
                of our site by remembering your settings, personalising content
                and measuring the performance of our site. You can allow all
                cookies or manage them individually.
              </Typography>
            </Grid>
            <Grid
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem',
              }}
              xs={12}
              md={3}
            >
              <Button variant="outlined" onClick={handleAccept}>
                Allow all cookies
              </Button>
              <Button variant="outlined" onClick={handlePersonalise}>
                Customise cookies
              </Button>
              <Button variant="outlined" onClick={handleDecline}>
                Use necessary cookies only
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
      {openPersonalise && (
        <Dialog
          open={openPersonalise}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '& .MuiDialog-paper': {
              width: '100%',
              maxWidth: '70%',
              margin: 0,
              borderRadius: 0,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingInlineStart: '1rem',
            }}
          >
            <Tooltip title="Back" placement="top">
              <IconButton
                aria-label="back"
                onClick={() => setOpenPersonalise(false)}
              >
                <ArrowBackIcon
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                />
              </IconButton>
            </Tooltip>
            <DialogTitle id="alert-dialog-title">
              {'Cookies consent'}
            </DialogTitle>
          </Box>

          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                  }}
                >
                  <Typography
                    sx={{
                      width: '7rem',
                    }}
                    variant="h6"
                  >
                    Necessary
                  </Typography>
                  <FormControlLabel
                    control={
                      <IOSSwitch sx={{ m: 1 }} defaultChecked disabled />
                    }
                    label="Accept"
                  />
                </Box>
                <Typography variant="body1">
                  Strictly Necessary Cookies are essential for our Services to
                  function and therefore cannot be switched off. They are
                  usually only set in response to actions made by you which
                  amount to a request for services, such as setting your privacy
                  preferences, logging in, or filling in forms. These also
                  include cookies we may rely on for security purposes, such as
                  to prevent unauthorized access attempts. You can set your
                  browser to block or alert you about these cookies at any time,
                  but some features of our Services may not work.
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                  }}
                >
                  <Typography
                    sx={{
                      width: '7rem',
                    }}
                    variant="h6"
                  >
                    Preferences
                  </Typography>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={cookiesAccepted.preferences}
                        onChange={handlePreferencesChange}
                      />
                    }
                    label={cookiesAccepted.preferences ? 'Accept' : 'Decline'}
                  />
                </Box>
                <Typography variant="body1">
                  We use these Cookies to remember the choices you make (e.g.
                  country or language selection) and to tailor our Services to
                  your preferences. For example, our first party
                  cm_default_preferences cookie remembers your cookie
                  preferences and lasts for 6 months.
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                  }}
                >
                  <Typography
                    sx={{
                      width: '7rem',
                    }}
                    variant="h6"
                  >
                    Performance
                  </Typography>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={handlePerformanceChange}
                        checked={cookiesAccepted.statistics}
                      />
                    }
                    label={cookiesAccepted.statistics ? 'Accept' : 'Decline'}
                  />
                </Box>
                <Typography variant="body1">
                  We use these Cookies to count visits and traffic sources so we
                  can measure and improve the performance of our Services. They
                  help us to know which pages are the most and least popular and
                  see how visitors move around the Sites and Apps, and to
                  resolve any errors that occur on the Services quickly to
                  provide you with a better experience. For example, Cookies
                  like our third party JSESSIONID cookie are used to provide
                  analytics on how our Apps perform. This cookie lasts for the
                  duration of your browsing session.
                </Typography>
              </Box>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default CookiesConsentBanner
