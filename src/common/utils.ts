import {
    AlteredScale,
    AlteredScaleInfo,
    AnyScale,
    BaseScaleInfo,
    Degree,
    Note,
    noteName,
    noteNameFlat,
    noteNameSharp,
    Scale,
    ScaleDegreesInfo,
} from './types.ts'
import {
    ALL_ALTERED_SCALES,
    Interval,
    SCALES_WITHOUT_DEGREES,
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

export const getNoteNameMap = (preferredNaming: 'flat' | 'sharp' | null) => {
    return preferredNaming === 'flat'
        ? noteNameFlat
        : preferredNaming === 'sharp'
          ? noteNameSharp
          : noteName
}

export const getNoteName = (
    note: Note,
    preferredNaming: 'flat' | 'sharp' | null
) => {
    const nameMap = getNoteNameMap(preferredNaming)
    return nameMap[note]
}

export const getPreferredNaming = (
    baseScaleInfo: BaseScaleInfo | null,
    alteredScaleInfo: AlteredScaleInfo | null
): 'flat' | 'sharp' => {
    const defaultSign = 'sharp'
    if (!baseScaleInfo) {
        return defaultSign
    }
    if (baseScaleInfo.sign) {
        return baseScaleInfo.sign
    }
    if (alteredScaleInfo && alteredScaleInfo.alterations.size > 0) {
        return [...alteredScaleInfo.alterations.values()][0]
    }
    return defaultSign
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
        if (SCALES_WITHOUT_DEGREES.includes(scale)) {
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
