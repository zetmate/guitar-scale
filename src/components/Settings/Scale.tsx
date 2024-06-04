import { useCallback } from 'react'
import { Note, Scale } from '../../common/types.ts'
import { useSettings } from './useSettings.ts'
import { NoteSelector } from './selectors/NoteSelector.tsx'
import { Group } from './Group.tsx'

export const ScaleForm = () => {
    const { scale, setSettings } = useSettings()
    const value = scale.root

    const onSelect = useCallback(
        (root: Note, type: Scale) => {
            setSettings((prevSettings) => {
                return {
                    ...prevSettings,
                    scale: {
                        root,
                        type,
                    },
                }
            })
        },
        [setSettings]
    )

    return (
        <Group title="Scale">
            <NoteSelector
                onSelect={(note) => onSelect(note, scale.type)}
                value={value}
                label="Root"
            />
        </Group>
    )
}
