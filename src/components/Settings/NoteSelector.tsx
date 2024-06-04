import React, { useCallback } from 'react'
import { Button, DropdownMenu } from '@radix-ui/themes'
import { Note, noteName } from '../../common/types.ts'
import { ALL_NOTES } from '../../common/constants.ts'
import { useSettings } from './useSettings.ts'

interface NoteSelectorProps {
    stringIndex: number
}

export const NoteSelector = React.memo(({ stringIndex }: NoteSelectorProps) => {
    const { tuning, setSettings } = useSettings()
    const value = tuning[stringIndex]

    const onSelect = useCallback(
        (note: Note) => {
            setSettings((prevSettings) => {
                const newTuning = [...tuning]
                newTuning[stringIndex] = note

                return {
                    ...prevSettings,
                    tuning: newTuning,
                }
            })
        },
        [stringIndex, setSettings]
    )

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="soft">
                    {noteName[value]}
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {ALL_NOTES.map((note) => (
                    <DropdownMenu.Item
                        key={note}
                        onClick={() => onSelect(note)}
                    >
                        {noteName[note]}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
})
