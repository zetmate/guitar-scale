import { Container, Section } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'

function App() {
    return (
        <SettingsProvider>
            <Container>
                <Section>
                    <Fretboard />
                </Section>
            </Container>
        </SettingsProvider>
    )
}

export default App
