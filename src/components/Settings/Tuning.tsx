import React, { useCallback } from 'react'
import { useSettings } from './useSettings.ts'
import { Button } from '@radix-ui/themes'
import {
    DEFAULT_STRING_NOTES,
    MAX_STRINGS,
    MIN_STRINGS,
} from '../../common/constants.ts'
import { Note } from '../../common/types.ts'
import { StringNoteSelector } from './selectors/StringNoteSelector.tsx'

const getNewTuning = (prevTuning: Note[], action: 'add' | 'remove') => {
    if (action === 'remove') {
        return prevTuning.slice(0, prevTuning.length - 1)
    }
    if (action === 'add') {
        return [
            ...prevTuning,
            DEFAULT_STRING_NOTES[prevTuning.length] || Note.A,
        ]
    }
    return prevTuning
}

export const Tuning = React.memo(() => {
    const { tuning, setSettings } = useSettings()

    const onStringsChange = useCallback(
        (action: 'add' | 'remove') => {
            setSettings((prevSettings) => ({
                ...prevSettings,
                tuning: getNewTuning(prevSettings.tuning, action),
            }))
        },
        [setSettings]
    )

    return (
        <div className="group__column">
            <div className="group__row flex_row_reverse">
                {tuning.map((note, index) => (
                    <StringNoteSelector
                        key={`${note}_${index}`}
                        stringIndex={index}
                    />
                ))}
            </div>
            <div className="group__row">
                <Button
                    variant="soft"
                    color="red"
                    onClick={() => onStringsChange('remove')}
                    disabled={tuning.length <= MIN_STRINGS}
                >
                    Remove
                </Button>
                <Button
                    variant="soft"
                    color="blue"
                    onClick={() => onStringsChange('add')}
                    disabled={tuning.length >= MAX_STRINGS}
                >
                    Add
                </Button>
            </div>
        </div>
    )
})
