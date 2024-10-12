import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import '@radix-ui/themes/styles.css'
import { App } from './App.tsx'
import { LocalStorageProvider } from './components/LocalStorage/context.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'

const Root = () => (
    <React.StrictMode>
        <LocalStorageProvider>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </LocalStorageProvider>
    </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
