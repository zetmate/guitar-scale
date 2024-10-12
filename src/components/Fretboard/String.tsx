import { Note } from '../../common/types.ts'
import { NUMBER_OF_FRETS } from '../../common/constants.ts'
import { getIntervalNoteFrom, getNoteName } from '../../common/utils.ts'
import { Badge, Text } from '@radix-ui/themes'
import { Fret } from './Fret.tsx'
import React, { useMemo } from 'react'
import { Row } from './Grid/Row.tsx'
import { useSettings } from '../Settings/useSettings.ts'
import './fretboard.css'

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

export const String = React.memo(({ stringNote }: StringProps) => {
    const { scale, color } = useSettings()
    const fretboard = useMemo(() => getFretboard(stringNote), [stringNote])
    const noteName = getNoteName(stringNote, scale.preferredNaming)
    const isHighlighted = scale.notesSet.has(stringNote)

    return (
        <Row
            firstCellContent={
                <div className="fretboard__string_cell">
                    {isHighlighted ? (
                        <Badge size="2" color={color.default}>
                            {noteName}
                        </Badge>
                    ) : (
                        <Text size="2" color="gray" weight="bold">
                            {noteName}
                        </Text>
                    )}
                </div>
            }
        >
            {fretboard.map((note, index) => ({
                key: `${index}_${noteName}`,
                node: <Fret note={note} />,
            }))}
        </Row>
    )
})
