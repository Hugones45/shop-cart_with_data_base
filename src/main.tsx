import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { router } from './App.tsx'
import { RouterProvider } from "react-router-dom"
import { ProductsContextProvider } from './context/ProductsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <ProductsContextProvider>
      <RouterProvider router={router} />
    </ProductsContextProvider>

  </React.StrictMode>,
)
