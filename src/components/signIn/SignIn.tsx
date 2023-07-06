'use client'

import styles from './SignIn.module.scss'
import { BsFacebook } from 'react-icons/bs' // import Facebook icon
import { AiFillGoogleCircle } from 'react-icons/ai' // import Google icon
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import LoaderIcon from '../animations/loaderIcon/LoaderIcon'

export interface ISignIn {
  providersLoginText: string,
  providers: object,
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the SignIn be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * SignIn contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const SignIn: React.FC<ISignIn> = ({
  providers,
  providersLoginText,
  primary = false,
  label,
  ...props
}) => {
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  async function handleLogin(provider: any) {
    setLoadingProvider(provider.id)

    try {
      await signIn(provider.id, { callbackUrl: '/' })
    } catch (error) {
      console.error('Error Login:', error)
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <ul className={styles.ul}>
      {/* Loop through the providers and display a button for each */}
      {providers &&
        Object.values(providers).map((provider: any) => (
          <li className={styles.li} key={provider.name}>
            <button
              className={`${styles.button} ${
                provider.id === 'google' ? styles.secondary : ''
              }`}
              onClick={() => handleLogin(provider)}
            >
              {/* Choose the icon based on the provider id */}
              {loadingProvider === provider.id ? (
            <LoaderIcon label={''}/>
          ) : provider.id === 'facebook' ? (
            <BsFacebook />
          ) : (
            <AiFillGoogleCircle />
          )}
              {providersLoginText} {provider.name}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default SignIn
