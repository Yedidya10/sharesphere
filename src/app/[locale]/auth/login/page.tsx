import Providers from '@/components/buttons/providers/Providers'
import MagicLinkForm from '@/components/forms/magicLinkForm/MagicLinkForm'
import SignInForm from '@/components/forms/signInForm/SignInForm'
import Box from '@mui/material/Box'
import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Login',
}

// Define the interface for the Login component
export interface ILogin {
  providersLoginText: string
  providers: any
  Login: any
}

const Login: React.FC<ILogin> = async () => {
  const providers = await getProviders()
  const providersLoginText = 'Continue with'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* <SignInForm label={''} /> */}
      {/* Once there is a domain, it will be possible to define this provider.
      https://authjs.dev/guides/providers/email
      https://nodemailer.com/about/#example */}
      {/* <MagicLinkForm label={''} /> */}
      <Providers
        providers={providers}
        providersLoginText={providersLoginText}
        label={''}
      />
    </Box>
  )
}

export default Login
