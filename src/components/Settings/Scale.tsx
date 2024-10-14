import {
    AlteredScale,
    AlteredScaleInfo,
    Color,
    Note,
    Scale,
} from '../../common/types.ts'
import { useSettings } from './useSettings.ts'
import { NoteSelector } from './selectors/NoteSelector.tsx'
import { Selector } from './selectors/Selector.tsx'
import { ALL_COLORS, ALL_SCALES } from '../../common/constants.ts'
import { Box, Flex, Switch, Text, Tooltip } from '@radix-ui/themes'
import { SettingsContextValue } from './Provider.tsx'
import { getNoteName, getNoteNameMap } from '../../common/utils.ts'
import './settings.css'

const getNotesText = (scale: SettingsContextValue['scale']) => {
    const nameMap = getNoteNameMap(scale.preferredNaming)
    const alterations =
        scale.alteredScaleInfo?.alterations ||
        (new Map() as AlteredScaleInfo['alterations'])

    return scale.notes.map((note, index) => {
        const alt = alterations.get(index)
        const className = alt && `scale__notes_list__${alt}`
        return (
            <span key={note} className={className}>
                {nameMap[note]}&nbsp;&nbsp;
            </span>
        )
    })
}

const getHighlightExplanationText = (
    baseScale: { note: Note; type: Scale },
    preferredNaming: 'flat' | 'sharp'
) => {
    return `Your chosen scale is based on ${getNoteName(baseScale.note, preferredNaming)} ${baseScale.type}. Notes that a sharp to it are highlighted with green, flat - with red`
}

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
                    <Tooltip
                        content={
                            scale.alteredScaleInfo
                                ? getHighlightExplanationText(
                                      {
                                          note: scale.root,
                                          type: scale.alteredScaleInfo.base,
                                      },
                                      scale.preferredNaming
                                  )
                                : undefined
                        }
                    >
                        <Text>{getNotesText(scale)}</Text>
                    </Tooltip>
                </Flex>
            </Flex>
        </Flex>
    )
}
