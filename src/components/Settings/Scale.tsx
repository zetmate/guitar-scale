import { useCallback } from 'react'
import { Color, Note, Scale } from '../../common/types.ts'
import { useSettings } from './useSettings.ts'
import { NoteSelector } from './selectors/NoteSelector.tsx'
import { Selector } from './selectors/Selector.tsx'
import { ALL_COLORS, ALL_SCALES } from '../../common/constants.ts'
import { Flex } from '@radix-ui/themes'

export const ScaleForm = () => {
    const { scale, color, setSettings } = useSettings()
    const value = scale.root

    const onSelectScale = useCallback(
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

    const onSelectColor = useCallback(
        (color: Color) => {
            setSettings((prevSettings) => {
                return {
                    ...prevSettings,
                    color: {
                        default: color,
                    },
                }
            })
        },
        [setSettings]
    )

    return (
        <Flex direction="column" gap="3">
            <Flex direction="row" gap="3">
                <NoteSelector
                    onSelect={(note) => onSelectScale(note, scale.type)}
                    value={value}
                />
                <Selector<Scale>
                    value={scale.type}
                    onSelect={(scaleType) =>
                        onSelectScale(scale.root, scaleType)
                    }
                    items={ALL_SCALES}
                />
            </Flex>
            <Flex direction="row" gap="3">
                <Selector<Color>
                    value={color.default}
                    onSelect={onSelectColor}
                    items={ALL_COLORS}
                    buttonText="Color"
                    color={color.default}
                    getItemColor={(item) => item}
                />
            </Flex>
        </Flex>
    )
}
