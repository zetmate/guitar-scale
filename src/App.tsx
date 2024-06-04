import { Box, Flex, Heading, Section, Text } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'
import { Settings } from './components/Settings'

function App() {
    return (
        <SettingsProvider>
            <Section px="8">
                <Flex gapY="9" direction="column">
                    <Flex justify="start" align="center" gapX="3">
                        <Heading as="h1" size="8">
                            guitar-scale
                        </Heading>
                        <Box>
                            <Text>by zetmate</Text>
                        </Box>
                    </Flex>
                    <Settings />
                    <Fretboard />
                </Flex>
            </Section>
        </SettingsProvider>
    )
}

export default App
