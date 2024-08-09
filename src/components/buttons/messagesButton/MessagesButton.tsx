import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export interface IMessagesButton {
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

const MessagesButton: React.FC<IMessagesButton> = ({
  primary = false,
  label,
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
       {status === 'authenticated' && (
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Messages">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              padding: 1.5,
            }}
            aria-controls={open ? 'messages-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        id="messages-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList sx={{ width: '100%', maxWidth: 460 }}>
          <MenuItem
            onClick={() => {
              handleClose()
              router.push('/messages')
            }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Avatar src="/broken-image.jpg" />

            <Box
              sx={{
                maxWidth: 460,
              }}
            >
              <Typography
                sx={{
                  fontWeight: '500',
                }}
              >
                John Doe
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ipsum purus, bibendum sit amet
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose()
              router.push('/messages')
            }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Avatar src="/broken-image.jpg" />
            <Box
              sx={{
                maxWidth: 460,
              }}
            >
              <Typography
                sx={{
                  fontWeight: '500',
                }}
              >
                Sarah Andrews
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ipsum purus
              </Typography>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default MessagesButton
