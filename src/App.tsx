import { Container, Section } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'
import { SettingsProvider } from './components/Settings/Provider.tsx'
import { NoteSelector } from './components/Settings/NoteSelector.tsx'

function App() {
    return (
        <SettingsProvider>
            <Container>
                <Section>
                    <Fretboard />
                </Section>
                <Section>
                    <NoteSelector stringIndex={0} />
                </Section>
            </Container>
        </SettingsProvider>
    )
}

export default App
