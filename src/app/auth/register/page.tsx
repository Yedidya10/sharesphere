import { BsSpotify } from 'react-icons/bs' // import Spotify icon
import { AiFillGoogleCircle } from 'react-icons/ai' // import Google icon
import { useState } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import styles from './page.module.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
}

// Define the interface for the Register component
export interface IRegister {
  providersLoginText: string
  providers: any
  Register: any
}

export async function getServerSideProps({}: {}) {
  try {
    const providers = await getProviders()

    return {
      props: {
        providers,
      },
    }
  } catch (error) {
    console.error('Error fetching providers:', error)
  }
}

const Register: React.FC<IRegister> = ({
  providersLoginText, // Text to display before the provider name
  providers,
  Register,
}) => {
  // const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  // async function handleRegister(provider: any) {
  //   setLoadingProvider(provider.id)

  //   try {
  //     await Register(provider.id, { callbackUrl: '/' })
  //   } catch (error) {
  //     console.error('Error signing in:', error)
  //   } finally {
  //     setLoadingProvider(null)
  //   }
  // }

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
              // onClick={() => handleRegister(provider)}
            >
              {/* Choose the icon based on the provider id */}
              {/* {loadingProvider === provider.id ? (
                <CircularProgress size={20} color="inherit" />
              ) : provider.id === 'spotify' ? (
                <BsSpotify />
              ) : (
                <AiFillGoogleCircle />
              )} */}
              {providersLoginText} {provider.name}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Register
