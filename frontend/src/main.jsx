import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom' ; 
import {QueryClient,  QueryClientProvider } from '@tanstack/react-query' ; 
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },

}) ;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Toaster/>
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
