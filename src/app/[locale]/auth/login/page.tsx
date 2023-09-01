import Providers from '@/components/providers/Providers'
import SignInForm from '@/components/signInForm/SignInForm'
import SignUp from '@/components/signUp/SignUp'
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
      <SignInForm label={''} />
      <Providers
        providers={providers}
        providersLoginText={providersLoginText}
        label={''}
      />
    </Box>
  )
}

export default Login
