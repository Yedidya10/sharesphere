import { Metadata } from 'next'
import styles from './page.module.scss'
import SignUp from '@/components/signUp/SignUp'
import Providers from '@/components/providers/Providers'
import { getProviders } from 'next-auth/react'
import  Box  from '@mui/material/Box'

export const metadata: Metadata = {
  title: 'Register',
}

export interface IRegister {
  providersLoginText: string
  providers: any
  Register: any
}

const Register: React.FC<IRegister> = async () => {
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
    }}>
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
