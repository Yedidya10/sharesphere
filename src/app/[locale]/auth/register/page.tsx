import Providers from '@/components/buttons/providers/Providers'
import SignUp from '@/components/forms/signUpForm/SignUpForm'
import Box from '@mui/material/Box'
import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import { unstable_setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Register',
}

export interface IRegister {
  providersLoginText: string
  providers: any
  Register: any
  label: string
  locale: string
}

const Register: React.FC<IRegister> = async (
  { locale } : IRegister
) => {
  unstable_setRequestLocale(locale)
  const providers = await getProviders()
  const providersLoginText = 'Continue with'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        gap: '1rem',
        maxWidth: '440px',
      }}
    >
      <SignUp label={''} />
      <Providers
        providers={providers}
        providersLoginText={providersLoginText}
        label={''}
      />
    </Box>
  )
}

export default Register
