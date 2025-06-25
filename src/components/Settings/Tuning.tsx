import React, { useCallback } from 'react'
import { useSettings } from './useSettings.ts'
import { Button, IconButton, Text } from '@radix-ui/themes'
import {
    DEFAULT_STRING_NOTES,
    MAX_STRINGS,
    MIN_STRINGS,
} from '../../common/constants.ts'
import { Note } from '../../common/types.ts'
import { StringNoteSelector } from './selectors/StringNoteSelector.tsx'
import { getIntervalNoteFrom } from '../../common/utils.ts'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

const addOrRemoveString = (prevTuning: Note[], action: 'add' | 'remove') => {
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

const transposeTuning = (prevTuning: Note[], semitones: number) => {
    return prevTuning.map((note) => getIntervalNoteFrom(note, semitones))
}

export const Tuning = React.memo(() => {
    const { tuning, setSettings } = useSettings()

    const onStringsChange = useCallback(
        (action: 'add' | 'remove') => {
            setSettings((prevSettings) => ({
                ...prevSettings,
                tuning: addOrRemoveString(prevSettings.tuning, action),
            }))
        },
        [setSettings]
    )

    const onTranspose = useCallback(
        (semitones: number) => {
            setSettings((prevSettings) => ({
                ...prevSettings,
                tuning: transposeTuning(prevSettings.tuning, semitones),
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
                <div className="string_buttons">
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
                <div className="transpose_settings">
                    <IconButton
                        variant="soft"
                        color="gray"
                        onClick={() => onTranspose(-1)}
                    >
                        <MinusIcon />
                    </IconButton>
                    <Text>Transpose</Text>
                    <IconButton
                        variant="soft"
                        color="gray"
                        onClick={() => onTranspose(1)}
                    >
                        <PlusIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
})
