import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MainLayout } from '../layouts/MainLayout'
import { UIContextProvider } from '../context/UIContext'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <UIContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UIContextProvider>
  ) 
}
