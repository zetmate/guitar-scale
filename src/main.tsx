import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'

const Root = () => (
    <React.StrictMode>
        <Theme accentColor="grass" appearance="dark">
            <App />
        </Theme>
    </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
