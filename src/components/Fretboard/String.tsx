import { Note, noteName } from '../../common/types.ts'
import { NUMBER_OF_FRETS } from '../../common/constants.ts'
import { getIntervalNoteFrom } from '../../common/utils.ts'
import { Text } from '@radix-ui/themes'
import { Fret } from './Fret.tsx'
import { useMemo } from 'react'
import { Row } from './Grid/Row.tsx'

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
        <Row
            firstCellContent={<Text weight="bold">{noteName[stringNote]}</Text>}
        >
            {fretboard.map((note, index) => ({
                key: `${index}_${noteName[note]}`,
                node: <Fret note={note} />,
            }))}
        </Row>
    )
}
