import { Badge, Text } from '@radix-ui/themes'
import { Note, noteName } from '../../common/types.ts'
import { Cell } from './Grid/Cell.tsx'
import { useSettings } from '../Settings/useSettings.ts'
import React from 'react'

interface FretProps {
    note: Note
}

export const Fret = React.memo(({ note }: FretProps) => {
    const {
        scale: { notesSet },
        color,
        showAllNotes,
    } = useSettings()
    const noteColor = notesSet.has(note) ? color.default : undefined
    return (
        <Cell>
            {noteColor ? (
                <Badge size="3" color={noteColor || 'gray'}>
                    {noteName[note]}
                </Badge>
            ) : (
                showAllNotes && <Text size="1">{noteName[note]}</Text>
            )}
        </Cell>
    )
})
