import { Flex, Section, Theme } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'
import { Settings } from './components/Settings'
import React, { useCallback, useState } from 'react'
import { ThemeMode } from './common/types.ts'
import { Header } from './components/Header'
import { useLocalStorage } from './components/LocalStorage/context.tsx'

export const App = React.memo(() => {
    const { updateTheme: saveToStorage, theme: savedTheme } = useLocalStorage()
    const [theme, setTheme] = useState<ThemeMode>(savedTheme || 'light')

    const onThemeChange = useCallback(
        (newTheme: ThemeMode) => {
            setTheme(newTheme)
            saveToStorage(newTheme)
        },
        [setTheme, saveToStorage]
    )

    return (
        <Theme accentColor="green" appearance={theme}>
            <SettingsProvider>
                <Section px="8">
                    <Flex gapY="7" direction="column">
                        <Header setTheme={onThemeChange} currentTheme={theme} />
                        <Settings />
                        <Fretboard />
                    </Flex>
                </Section>
            </SettingsProvider>
        </Theme>
    )
})
