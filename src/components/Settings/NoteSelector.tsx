import React, { useCallback } from 'react'
import { Box, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'
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
                <Flex direction="column" align="start">
                    <Box flexShrink="0" pb="2">
                        <Text weight="medium" size="2">
                            Str {stringIndex + 1}
                        </Text>
                    </Box>
                    <Button variant="soft">
                        {noteName[value]}
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </Flex>
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
