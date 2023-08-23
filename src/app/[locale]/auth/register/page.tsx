import { useState } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import styles from './page.module.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
}

// Define the interface for the Register component
export interface IRegister {

}

// export async function getServerSideProps({}: {}) {
//   try {
//     const providers = await getProviders()

//     return {
//       props: {
//         providers,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching providers:', error)
//   }
// }

const Register: React.FC<IRegister> = ({

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

  return <ul className={styles.ul}></ul>
}

export default Register
