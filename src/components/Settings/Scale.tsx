import { AlteredScale, Color, Note, Scale } from '../../common/types.ts'
import { useSettings } from './useSettings.ts'
import { NoteSelector } from './selectors/NoteSelector.tsx'
import { Selector } from './selectors/Selector.tsx'
import { ALL_COLORS, ALL_SCALES } from '../../common/constants.ts'
import { Box, Flex, Switch, Text } from '@radix-ui/themes'

export const ScaleForm = () => {
    const { scale, color, showAllNotes, setSettings } = useSettings()

    const onSelectScale = (root: Note, type: Scale | AlteredScale) => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                scale: {
                    root,
                    type,
                },
            }
        })
    }
    const onSelectColor = (color: Color) => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                color: {
                    default: color,
                },
            }
        })
    }

    const onSwitch = (checked: boolean) => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                showAllNotes: checked,
            }
        })
    }

    return (
        <Flex direction="column" gap="3">
            <Flex direction="row" gap="3">
                <NoteSelector
                    onSelect={(note) => onSelectScale(note, scale.type)}
                    value={scale.root}
                />
                <Selector<Scale | AlteredScale>
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
                <Flex flexShrink="0" align="center">
                    <Box flexShrink="0" pr="2">
                        <Text size="2">Show all notes</Text>
                    </Box>
                    <Switch
                        variant="soft"
                        checked={showAllNotes}
                        onCheckedChange={onSwitch}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}
