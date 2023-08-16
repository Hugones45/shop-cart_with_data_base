import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { router } from './App.tsx'
import { RouterProvider } from "react-router-dom"
import { ProductsContextProvider } from './context/ProductsContext.tsx'

import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <ProductsContextProvider>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <RouterProvider router={router} />
    </ProductsContextProvider>

  </React.StrictMode>,
)
