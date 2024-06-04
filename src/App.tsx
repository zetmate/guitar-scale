import {
    Box,
    Container,
    Flex,
    Heading,
    ScrollArea,
    Section,
} from '@radix-ui/themes'
import { Note } from './common/types.ts'
import { String } from './components/String.tsx'

function App() {
    return (
        <Container>
            <Section>
                <Heading size="8" as="h1" align="center">
                    Guitar Scale
                </Heading>
            </Section>
            <Section>
                <ScrollArea type="always" scrollbars="horizontal">
                    <Box px="2" py="6">
                        <Flex direction="column" gapY="2">
                            <String stringNote={Note.A} />
                            <String stringNote={Note.E} />
                        </Flex>
                    </Box>
                </ScrollArea>
            </Section>
        </Container>
    )
}

export default App
