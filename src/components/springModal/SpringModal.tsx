import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
  top: 'calc(50%)',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  width: '95%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  // borderRadius: 2,
  boxShadow: 24,
  overflow: 'auto', // Add overflow property
  maxHeight: 'calc(80vh - 70px)', // Add max-height property
  p: 4,
}

export interface ISpringModal {
  openModal: boolean
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
    >
      <Fade in={openModal}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  )
}

export default SpringModal
