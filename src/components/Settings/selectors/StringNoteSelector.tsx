import React, { useCallback } from 'react'
import { Note } from '../../../common/types.ts'
import { useSettings } from '../useSettings.ts'
import { NoteSelector } from './NoteSelector.tsx'

interface NoteSelectorProps {
    stringIndex: number
}

export const StringNoteSelector = React.memo(
    ({ stringIndex }: NoteSelectorProps) => {
        const { tuning, setSettings } = useSettings()
        const value = tuning[stringIndex]

        const onSelect = useCallback(
            (note: Note) => {
                setSettings((prevSettings) => {
                    const newTuning = [...prevSettings.tuning]
                    newTuning[stringIndex] = note

                    return {
                        ...prevSettings,
                        tuning: newTuning,
                    }
                })
            },
            [stringIndex, setSettings]
        )

        return <NoteSelector onSelect={onSelect} value={value} />
    }
)
