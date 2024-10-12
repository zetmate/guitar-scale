import React from 'react'
import { Badge, Text } from '@radix-ui/themes'
import { Note } from '../../common/types.ts'
import { useSettings } from '../Settings/useSettings.ts'
import { getNoteName } from '../../common/utils.ts'

interface FretProps {
    note: Note
}

export const Fret = React.memo(({ note }: FretProps) => {
    const {
        scale: { notesSet, preferredNaming },
        color,
        showAllNotes,
    } = useSettings()
    const noteColor = notesSet.has(note) ? color.default : undefined
    const noteName = getNoteName(note, preferredNaming)
    return (
        <div>
            {noteColor ? (
                <Badge size="3" color={noteColor || 'gray'}>
                    {noteName}
                </Badge>
            ) : (
                showAllNotes && <Text size="1">{noteName}</Text>
            )}
        </div>
    )
})
