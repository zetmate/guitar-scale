import { Container, Flex, Heading, Section } from '@radix-ui/themes'
import { Note } from './common/types.ts'
import { Fret } from './components/Fret.tsx'

function App() {
    return (
        <Container>
            <Section>
                <Heading size="8" as="h1" align="center">
                    Guitar Scale
                </Heading>
            </Section>
            <Section>
                <Flex px="5vh">
                    <Fret note={Note['C#/Db']} />
                    <Fret note={Note.C} color="blue" />
                </Flex>
            </Section>
        </Container>
    )
}

export default App
