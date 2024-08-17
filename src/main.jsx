import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'
import { LimitInfoProvdider } from './context/LimitInfoContext.jsx'

import './index.css'
import { HistogramsProvider } from './context/HistogramsContext.jsx'
import { DocumentsInfoProvider } from './context/DocumentsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <LimitInfoProvdider>
                    <HistogramsProvider>
                        <DocumentsInfoProvider>
                            <App />
                        </DocumentsInfoProvider>
                    </HistogramsProvider>
                </LimitInfoProvdider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
