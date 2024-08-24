'use client'

import EmailIcon from '@mui/icons-material/Email'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'
import { styled } from '@mui/material/styles'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useEffect, useState } from 'react'
import { ObjectId } from 'mongoose'

export interface IItemRequestButton {
  handleClick?: () => void
  isUserAlreadyRequest: boolean
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ItemRequestButton be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ItemRequestButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(13),
    border: '1px solid #dadde9',
  },
}))

const ItemRequestButton: React.FC<IItemRequestButton> = ({
  primary = false,
  label,
  handleClick,
  isUserAlreadyRequest,
}) => {
  const { status } = useSession()

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e0e0e0',
          padding: '10px',
        }}
      >
        <EventAvailableIcon fontSize="large" color="success" />
        <Typography>Available for request</Typography>
      </Box>
      <Tooltip
        title={
          isUserAlreadyRequest === false
            ? 'Request this item to borrow it'
            : isUserAlreadyRequest === true && status === 'authenticated'
            ? 'You already requested this item'
            : 'You need to be logged in to request this item'
        }
      >
        {isUserAlreadyRequest === false ? (
          <span>
            <Button
              fullWidth
              variant="outlined"
              color={'primary'}
              disabled={status !== 'authenticated' || isUserAlreadyRequest}
              onClick={handleClick}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  paddingBlock: '5px',
                }}
              >
                <EmailIcon />
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                  }}
                >
                  Request Item
                </Typography>
              </Box>
            </Button>
          </span>
        ) : (
          <Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                paddingBlock: '5px',
              }}
            >
              <HtmlTooltip
                title={
                  <>
                    <Typography
                      color="inherit"
                      sx={{
                        fontSize: '.8rem',
                      }}
                    ></Typography>
                    {`
                You already requested this item. 
                if you want to cancel or modify your request, you can do it from your dashboard > borrow items > pending requests.
                you will be notified when the owner accepts or rejects your request.
              `}
                  </>
                }
              >
                <InfoOutlinedIcon
                  sx={{
                    fontSize: '16px',
                  }}
                />
              </HtmlTooltip>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                }}
              >
                Already Requested
              </Typography>
            </Box>
          </Box>
        )}
      </Tooltip>
    </>
  )
}

export default ItemRequestButton
