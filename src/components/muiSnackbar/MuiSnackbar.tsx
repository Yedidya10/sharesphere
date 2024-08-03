import * as React from 'react'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

interface IMuiSnackbar {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
  state: {
    open: boolean
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  handleClose: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const MuiSnackbar: React.FC<IMuiSnackbar> = ({
  message,
  severity,
  state,
  handleClose,
}) => {
  const { vertical, horizontal, open } = state

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MuiSnackbar
