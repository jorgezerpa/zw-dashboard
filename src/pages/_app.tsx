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
    domain="dev-x7zwzkjp2jhejnw5.us.auth0.com"
    clientId="BzI7A4OgEBQamHthS6z3Va87qhtXY6nj"
    redirectUri='http://localhost:3000'
    scope='admin'
    audience='https://zerpasw.zerpacode.com/api'
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
