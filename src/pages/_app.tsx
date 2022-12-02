import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import type { AppProps } from 'next/app'
import { MainLayout } from '../layouts/MainLayout'
import { UIContextProvider } from '../context/UIContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <DndProvider backend={HTML5Backend}>
      <UIContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </UIContextProvider>
    </DndProvider>
  ) 
}
