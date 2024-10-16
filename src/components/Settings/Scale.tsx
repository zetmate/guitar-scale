import React from 'react'
import { AlteredScaleInfo, AnyScale, Note, Scale } from '../../common/types.ts'
import { useSettings } from './useSettings.ts'
import { NoteSelector } from './selectors/NoteSelector.tsx'
import { Selector } from './selectors/Selector.tsx'
import { ALL_SCALES } from '../../common/constants.ts'
import { Box, Flex, Switch, Text, Tooltip } from '@radix-ui/themes'
import { SettingsContextValue } from './Provider.tsx'
import './settings.css'

const getNotesText = (scale: SettingsContextValue['scale']) => {
    const alterations =
        scale.alteredScaleInfo?.alterations ||
        (new Map() as AlteredScaleInfo['alterations'])

    return scale.notes.map((note, index) => {
        const alt = alterations.get(index)
        const className = alt && `scale__notes_list__${alt}`
        return (
            <span key={note} className={className}>
                {scale.noteNameMap[note]}&nbsp;&nbsp;
            </span>
        )
    })
}

const getHighlightExplanationText = (
    baseScale: { note: Note; type: Scale },
    nameMap: Record<Note, string>
) => {
    return `Your chosen scale is based on ${nameMap[baseScale.note]} ${baseScale.type}. Notes that a sharp to it are highlighted with green, flat - with red`
}

export const ScaleForm = React.memo(() => {
    const { scale, showAllNotes, academicNotation, setSettings } = useSettings()

    const onSelectScale = (root: Note, type: AnyScale) => {
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

    const onSwitch = (checked: boolean) => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                showAllNotes: checked,
            }
        })
    }

    const onAcademicNotationSwitch = (checked: boolean) => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                academicNotation: checked,
            }
        })
    }

    const notesListTooltip = scale.alteredScaleInfo
        ? getHighlightExplanationText(
              {
                  note: scale.root,
                  type: scale.alteredScaleInfo.base,
              },
              scale.noteNameMap
          )
        : undefined

    return (
        <div className="group__column">
            <div className="group__row">
                <NoteSelector
                    onSelect={(note) => onSelectScale(note, scale.type)}
                    value={scale.root}
                />
                <Selector<AnyScale>
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
            </div>
            <div className="group__row">
                <Flex flexShrink="0" align="center">
                    <Tooltip
                        hidden={!notesListTooltip}
                        content={notesListTooltip}
                    >
                        <Text>{getNotesText(scale)}</Text>
                    </Tooltip>
                </Flex>
                {scale.containsAcademicNotation && (
                    <Flex flexShrink="0" align="center">
                        <Box flexShrink="0" pr="2">
                            <Text size="2">Academic notation</Text>
                        </Box>
                        <Switch
                            variant="soft"
                            checked={academicNotation}
                            onCheckedChange={onAcademicNotationSwitch}
                        />
                    </Flex>
                )}
            </div>
        </div>
    )
})
