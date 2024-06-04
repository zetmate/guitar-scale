import React, { useCallback } from 'react'
import { useSettings } from './useSettings.ts'
import { Button, Flex } from '@radix-ui/themes'
import { DEFAULT_STRING_NOTES } from '../../common/constants.ts'
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
        <Flex direction="column" gap="3">
            <Flex gap="3">
                {tuning.map((note, index) => (
                    <StringNoteSelector
                        key={`${note}_${index}`}
                        stringIndex={index}
                    />
                ))}
            </Flex>
            <Flex gap="3">
                <Button
                    variant="soft"
                    color="red"
                    onClick={() => onStringsChange('remove')}
                >
                    Remove
                </Button>
                <Button
                    variant="soft"
                    color="blue"
                    onClick={() => onStringsChange('add')}
                >
                    Add
                </Button>
            </Flex>
        </Flex>
    )
})
