import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { String } from './String.tsx'
import { FretNumberIndication } from './FretNumberIndication.tsx'
import { useSettings } from '../Settings/useSettings.ts'

export const Fretboard = () => {
    const { tuning } = useSettings()
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
