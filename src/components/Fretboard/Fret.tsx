import React, { useMemo } from 'react'
import { Badge, Text } from '@radix-ui/themes'
import { Degree, Note } from '../../common/types.ts'
import { useSettings } from '../Settings/useSettings.ts'
import { getNoteName } from '../../common/utils.ts'

interface FretProps {
    note: Note
}

export const Fret = React.memo(({ note }: FretProps) => {
    const {
        scale: { notesSet, preferredNaming, alterationsSet, degreesInfo },
        color,
        showAllNotes,
    } = useSettings()

    const noteColor = useMemo(() => {
        if (alterationsSet.has(note)) {
            return color.alterations
        }
        const { noteDegreeMap, hasSubdominant, hasTonic, hasDominant } =
            degreesInfo

        const degree = noteDegreeMap.get(note)
        if (degree === undefined) {
            return undefined
        }
        switch (degree) {
            case Degree.I:
                if (hasTonic) {
                    return color.tonic
                }
                break
            case Degree.IV:
                if (hasSubdominant) {
                    return color.subdominant
                }
                break
            case Degree.V:
                if (hasDominant) {
                    return color.dominant
                }
                break
        }

        if (notesSet.has(note)) {
            return color.default
        }
    }, [
        alterationsSet,
        color.alterations,
        color.default,
        color.dominant,
        color.subdominant,
        color.tonic,
        degreesInfo,
        note,
        notesSet,
    ])

    const noteName = getNoteName(note, preferredNaming)
    return (
        <div>
            {noteColor ? (
                <Badge size="3" color={noteColor || 'gray'}>
                    {noteName}
                </Badge>
            ) : (
                showAllNotes && <Text size="1">{noteName}</Text>
            )}
        </div>
    )
})
