import Layout from '@/components/layout'
import Logo from '@/components/logo'
import '@/styles/globals.css'
import '@/styles/character-sheet.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Logo />
    </div>
  )
}
