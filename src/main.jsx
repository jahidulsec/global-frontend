import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {  AuthProvider } from './context/AuthContext.jsx'
import { QuickViewProvider } from './context/QuickViewContext.jsx'

// ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.createRoot(document.getElementById('root')).render(

      <BrowserRouter>
        <AuthProvider>
          <QuickViewProvider>
            <App />
          </QuickViewProvider>
        </AuthProvider>
      </BrowserRouter>
)