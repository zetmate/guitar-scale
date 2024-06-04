import { Container, Heading, Section } from '@radix-ui/themes'
import { Fretboard } from './components/Fretboard.tsx'

function App() {
    return (
        <Container>
            <Section>
                <Heading size="8" as="h1" align="center">
                    Guitar Scale
                </Heading>
            </Section>
            <Section>
                <Fretboard />
            </Section>
        </Container>
    )
}

export default App
