import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import { animated, useSpring } from '@react-spring/web'
import * as React from 'react'

interface FadeProps {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    config: { duration: 300 }, // Adjust the duration value as needed
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true)
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true)
      }
    },
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  )
})

const style = {
  position: 'absolute' as 'absolute',
  top: 'calc(45%)',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  width: '95%',
  maxWidth: '1000px',
}

const iconButtonStyle = {
  position: 'relative' as 'relative',
  top: '-2px',
  left: 'calc(100% - 40px)',
  zIndex: 1,
  color: 'text.primary',
  bgcolor: 'background.paper',
  '&:hover': {
    color: 'primary.main',
    bgcolor: 'background.paper',
  },
}

const childrenStyle = {
  position: 'relative' as 'relative',
  // borderRadius: 2,
  maxHeight: 'calc(80vh - 70px)', // Add max-height property
  p: 2,
  boxShadow: 24,
  overflow: 'auto',
  zIndex: 1,
  bgcolor: 'background.paper',
  // color: 'text.primary',
}

export interface ISpringModal {
  openModal: boolean
  keepMounted?: boolean
  handleClose: () => void
  children: React.ReactNode
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SpringModal be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SpringModal contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SpringModal: React.FC<ISpringModal> = ({
  openModal,
  handleClose,
  keepMounted,
  children,
}) => {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
      keepMounted={keepMounted}
    >
      <Fade in={openModal}>
        <Box sx={style}>
          <IconButton
            aria-label="close-modal"
            onClick={handleClose}
            sx={iconButtonStyle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M12 10.586L5.707 4.293a1 1 0 00-1.414 1.414L10.586 12l-6.293 6.293a1 1 0 101.414 1.414L12 13.414l6.293 6.293a1 1 0 001.414-1.414L13.414 12l6.293-6.293a1 1 0 00-1.414-1.414L12 10.586z"
              />
            </svg>
          </IconButton>
          <Box sx={childrenStyle}>{children}</Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default SpringModal
