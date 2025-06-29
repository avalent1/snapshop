import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.js'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>,
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
