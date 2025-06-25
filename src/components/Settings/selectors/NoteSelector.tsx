import React from 'react'
import { Note } from '../../../common/types.ts'
import { ALL_NOTES } from '../../../common/constants.ts'
import { Selector } from './Selector.tsx'
import { useSettings } from '../useSettings.ts'

interface NoteSelectorProps {
    value: Note
    label?: string
    onSelect: (note: Note) => void
}

export const NoteSelector = React.memo(
    ({ onSelect, value, label }: NoteSelectorProps) => {
        const {
            scale: { noteNameMap },
        } = useSettings()

        return (
            <Selector<Note>
                value={value}
                onSelect={onSelect}
                label={label}
                items={ALL_NOTES}
                getItemText={(note) => noteNameMap[note!]}
            />
        )
    }
)
