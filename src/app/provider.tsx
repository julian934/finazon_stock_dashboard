'use client'
import React,{useState} from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext,useContext } from 'react';
import { StoreStateContextProvider } from './utils/context/storeContext'

//type Props = {}

const Provider = ({children}:any) => {
    const [client]=useState(new QueryClient());
    
  return (
    <>
    <StoreStateContextProvider>
    <QueryClientProvider client={client} >
     <ReactQueryStreamedHydration>
        {children}
     </ReactQueryStreamedHydration>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </StoreStateContextProvider>
    </>
  )
}

export {Provider}