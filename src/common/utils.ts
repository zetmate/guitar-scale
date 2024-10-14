import {
    AlteredScale,
    AlteredScaleInfo,
    BaseScaleInfo,
    Note,
    noteName,
    noteNameFlat,
    noteNameSharp,
    Scale,
    ScaleNotes,
} from './types.ts'
import { ALL_ALTERED_SCALES, Interval } from './constants.ts'
import { alteredScaleData, scaleSchema } from './scaleDefinitions.ts'

export const getIntervalNoteFrom = (note: Note, semitones: number): Note => {
    // OCTAVE is added for supporting "negative" intervals
    return (Interval.Octave + note + semitones) % Interval.Octave
}

export const getScaleNotes = (root: Note, scale: Scale): ScaleNotes => {
    const schema = scaleSchema[scale]

    let nextNote = root
    const result: Note[] = []

    for (const interval of schema) {
        result.push(nextNote)
        nextNote = getIntervalNoteFrom(nextNote, interval)
    }

    return result as ScaleNotes
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

export const isScaleAltered = (
    scale: AlteredScale | Scale
): scale is AlteredScale => {
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
    if (baseScaleInfo.scale === Scale.Octatonic) {
        return 'flat'
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
