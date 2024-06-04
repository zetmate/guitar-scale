import React from 'react'
import { Note, noteName } from '../../../common/types.ts'
import { ALL_NOTES } from '../../../common/constants.ts'
import { Selector } from './Selector.tsx'

interface NoteSelectorProps {
    value: Note
    label?: string
    onSelect: (note: Note) => void
}

export const NoteSelector = React.memo(
    ({ onSelect, value, label }: NoteSelectorProps) => {
        return (
            <Selector<Note>
                value={value}
                onSelect={onSelect}
                label={label}
                items={ALL_NOTES}
                getItemText={(note) => noteName[note!]}
            />
        )
    }
)
