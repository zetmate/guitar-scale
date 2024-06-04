import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import '@radix-ui/themes/styles.css'
import { App } from './App.tsx'

const Root = () => (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
