import { Note, noteName } from '../common/types.ts'
import { NUMBER_OF_FRETS } from '../common/constants.ts'
import { getIntervalNoteFrom } from '../common/utils.ts'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Fret } from './Fret.tsx'
import { useMemo } from 'react'

interface StringProps {
    stringNote: Note
}

const getFretboard = (stringNote: Note) => {
    const result: Note[] = []
    let currNote = stringNote

    for (let i = 1; i <= NUMBER_OF_FRETS; i++) {
        currNote = getIntervalNoteFrom(currNote, 1)
        result.push(currNote)
    }
    return result
}

export const String = ({ stringNote }: StringProps) => {
    const fretboard = useMemo(() => getFretboard(stringNote), [stringNote])
    return (
        <Flex gap="2" flexShrink="0" align="center">
            <Box pr="2" flexShrink="0" width="2vh">
                <Text weight="bold">{noteName[stringNote]}</Text>
            </Box>
            {fretboard.map((note, index) => (
                <Fret key={`${index}_${noteName[note]}`} note={note} />
            ))}
        </Flex>
    )
}
