import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/storeContext.jsx'
 /*contextapi visible throughout our app component */


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>  
    <App />
    </StoreContextProvider>
  </BrowserRouter>
)
