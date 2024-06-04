import { Note } from '../common/types.ts'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { String } from './String.tsx'
import { FretNumberIndication } from './FretNumberIndication.tsx'

const tuning = [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E]

export const Fretboard = () => {
    return (
        <ScrollArea type="always" scrollbars="horizontal">
            <Box px="2" pb="6">
                <Flex direction="column" gapY="2">
                    {tuning.map((stringNote, index) => (
                        <String
                            key={`${stringNote}_${index}`}
                            stringNote={stringNote}
                        />
                    ))}
                    <FretNumberIndication />
                </Flex>
            </Box>
        </ScrollArea>
    )
}
