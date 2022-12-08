import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import type { AppProps } from 'next/app'
import { MainLayout } from '../layouts/MainLayout'
import { UIContextProvider } from '../context/UIContext'
import { Auth0Provider } from "@auth0/auth0-react";
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Auth0Provider
    domain={ process.env.NEXT_PUBLIC_ZW_API_DOMAIN as string}
    clientId={process.env.NEXT_PUBLIC_ZW_API_CLIENT_ID as string}
    redirectUri={process.env.NEXT_PUBLIC_ZW_API_REDIRECT_URI as string}
    scope='admin'
    audience={process.env.NEXT_PUBLIC_ZW_API_AUDIENCE as string}
    >
        <DndProvider backend={HTML5Backend}>
          <UIContextProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </UIContextProvider>
        </DndProvider>
    </Auth0Provider>
  ) 
}
