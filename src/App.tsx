import React, { useCallback } from 'react'
import { Flex, Theme } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { Settings } from './components/Settings'
import { Header } from './components/Header'
import { MobileWarningPopup } from './components/MobileWarningPopup.tsx'
import { useSettings } from './components/Settings/useSettings.ts'
import './app.css'

export const App = React.memo(() => {
    const { theme, setSettings } = useSettings()
    const onThemeChange = useCallback(() => {
        setSettings((prev) => ({
            ...prev,
            theme: theme === 'dark' ? 'light' : 'dark',
        }))
    }, [theme, setSettings])

    return (
        <Theme accentColor="green" appearance={theme}>
            <div className="app">
                <Flex gapY="7" direction="column">
                    <Header setTheme={onThemeChange} currentTheme={theme} />
                    <MobileWarningPopup />
                    <Settings />
                    <Fretboard />
                </Flex>
            </div>
        </Theme>
    )
})
