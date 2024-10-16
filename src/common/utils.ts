import {
    AlteredScale,
    AlteredScaleInfo,
    AnyScale,
    BaseScaleInfo,
    Degree,
    Note,
    Scale,
    ScaleDegreesInfo,
} from './types.ts'
import {
    ALL_ALTERED_SCALES,
    DOUBLE_FLAT,
    DOUBLE_SHARP,
    FLAT,
    Interval,
    NATURAL,
    noteNameFlat,
    noteNameSharp,
    NON_DIATONIC_SCALES,
    SHARP,
    ALL_DIATONIC_SCALES,
} from './constants.ts'
import { alteredScaleData, scaleSchema } from './scaleDefinitions.ts'

export const getIntervalNoteFrom = (note: Note, semitones: number): Note => {
    // OCTAVE is added for supporting "negative" intervals
    return (Interval.Octave + note + semitones) % Interval.Octave
}

export const getScaleNotes = (root: Note, scale: Scale): Note[] => {
    const schema = scaleSchema[scale]

    let nextNote = root
    const result: Note[] = []

    for (const interval of schema) {
        result.push(nextNote)
        nextNote = getIntervalNoteFrom(nextNote, interval)
    }

    return result
}

export const getAlteredScaleNotes = (root: Note, scale: AlteredScale) => {
    const { alterations, base } = alteredScaleData[scale]
    const baseScaleNotes = getScaleNotes(root, base)

    return baseScaleNotes.map((note, degree) => {
        const alteration = alterations.get(degree)
        if (!alteration) {
            return note
        }
        return getIntervalNoteFrom(note, alteration === 'flat' ? -1 : 1)
    })
}

export const isScaleAltered = (scale: AnyScale): scale is AlteredScale => {
    return ALL_ALTERED_SCALES.has(scale as AlteredScale)
}

export const capitalize = (str: string) => {
    const arr = str.split('')
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
}

export const getNoteNameMap = ({
    scaleType,
    preferredNaming,
    baseNotes,
    alterations,
    notes,
}: {
    scaleType: AnyScale
    preferredNaming: 'flat' | 'sharp'
    baseNotes: Note[]
    notes: Note[]
    alterations: AlteredScaleInfo['alterations'] | null
}): Record<Note, string> => {
    const baseNamesObj =
        preferredNaming === 'flat' ? noteNameFlat : noteNameSharp

    const alteredNames: Record<Note, string> = { ...baseNamesObj }

    // Check alterations and add double-flat / sharp
    if (ALL_DIATONIC_SCALES.includes(scaleType)) {
        alterations?.forEach((alt, degree) => {
            const baseNote = baseNotes[degree]
            const note = notes[degree]
            const baseName = baseNamesObj[baseNote]

            if (alt === 'flat') {
                if (baseName.endsWith(SHARP)) {
                    alteredNames[note] = NATURAL + baseName[0]
                } else if (baseName.endsWith(FLAT)) {
                    alteredNames[note] = baseName[0] + DOUBLE_FLAT
                } else {
                    alteredNames[note] = baseName + FLAT
                }
            } else if (alt === 'sharp') {
                if (baseName.endsWith(FLAT)) {
                    alteredNames[note] = NATURAL + baseName[0]
                } else if (baseName.endsWith(SHARP)) {
                    alteredNames[note] = baseName[0] + DOUBLE_SHARP
                } else {
                    alteredNames[note] = baseName + SHARP
                }
            }
        })
        return alteredNames
    }

    return alteredNames
}

export const getPreferredNaming = (
    baseScaleInfo: BaseScaleInfo | null
): 'flat' | 'sharp' => {
    if (!baseScaleInfo) {
        return 'sharp'
    }
    if (baseScaleInfo.sign) {
        return baseScaleInfo.sign
    }
    return 'sharp'
}

export const getAlterationsSet = (
    alteredScaleInfo: AlteredScaleInfo,
    notes: Note[]
) => {
    return new Set(
        [...alteredScaleInfo.alterations.keys()].map((degree) => notes[degree])
    )
}

const getNoteDegreeMap = (scaleNotes: Note[]) => {
    const noteDegreeMap = new Map<Note, Degree>()
    scaleNotes.forEach((note, index) => {
        noteDegreeMap.set(note, index)
    })
    return noteDegreeMap
}

export const getScaleDegreeInfo = (
    scale: AnyScale,
    scaleNotes: Note[],
    alterations?: AlteredScaleInfo['alterations']
): ScaleDegreesInfo => {
    const checkHasDegree = (degree: Degree) => {
        if (NON_DIATONIC_SCALES.includes(scale)) {
            return false
        }
        if (!alterations) {
            return true
        }
        return !alterations.has(degree)
    }
    return {
        hasTonic: checkHasDegree(Degree.I),
        hasDominant: checkHasDegree(Degree.V),
        hasSubdominant: checkHasDegree(Degree.IV),
        noteDegreeMap: getNoteDegreeMap(scaleNotes),
    }
}
