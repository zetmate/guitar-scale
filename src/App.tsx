import { Container, Section } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard/Fretboard.tsx'

function App() {
    return (
        <Container>
            <Section>
                <Fretboard />
            </Section>
        </Container>
    )
}

export default App
