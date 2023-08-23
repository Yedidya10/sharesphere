import { getProviders } from 'next-auth/react'
import { NextRequest, NextResponse } from "next/server"
import styles from './page.module.scss'
import { Metadata } from 'next'
import SignIn from '@/components/signIn/SignIn'

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
  const providersLoginText = ('login-with')

  return (
    
    <div>
      <SignIn
        providers={providers}
        providersLoginText={providersLoginText}
        label={''}
      />
    </div>
  )
}

export default Login
