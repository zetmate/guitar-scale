import { Flex, Section, Theme } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'
import { Settings } from './components/Settings'
import React, { useState } from 'react'
import { ThemeMode } from './common/types.ts'
import { Header } from './components/Header'

export const App = React.memo(() => {
    const [theme, setTheme] = useState<ThemeMode>('light')
    return (
        <Theme accentColor="grass" appearance={theme}>
            <SettingsProvider>
                <Section px="8">
                    <Flex gapY="7" direction="column">
                        <Header setTheme={setTheme} currentTheme={theme} />
                        <Settings />
                        <Fretboard />
                    </Flex>
                </Section>
            </SettingsProvider>
        </Theme>
    )
})
