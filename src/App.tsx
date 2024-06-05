import { Flex, Section, Theme } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'
import { Settings } from './components/Settings'
import React, { useCallback, useState } from 'react'
import { ThemeMode } from './common/types.ts'
import { Header } from './components/Header'
import { useLocalStorage } from './components/LocalStorage/context.tsx'
import { MobileWarningPopup } from './components/MobileWarningPopup.tsx'

const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme: ThemeMode = preferDark ? 'dark' : 'light'

export const App = React.memo(() => {
    const { updateTheme: saveToStorage, theme: savedTheme } = useLocalStorage()
    const [theme, setTheme] = useState<ThemeMode>(savedTheme || defaultTheme)

    const onThemeChange = useCallback(
        (newTheme: ThemeMode) => {
            setTheme(newTheme)
            saveToStorage(newTheme !== defaultTheme ? newTheme : undefined)
        },
        [setTheme, saveToStorage]
    )

    return (
        <Theme accentColor="green" appearance={theme}>
            <SettingsProvider>
                <Section px="8">
                    <Flex gapY="7" direction="column">
                        <Header setTheme={onThemeChange} currentTheme={theme} />
                        <MobileWarningPopup />
                        <Settings />
                        <Fretboard />
                    </Flex>
                </Section>
            </SettingsProvider>
        </Theme>
    )
})
