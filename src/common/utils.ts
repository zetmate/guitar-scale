import { AlteredScale, Note, Scale, ScaleNotes } from './types.ts'
import { ALL_ALTERED_SCALES, OCTAVE } from './constants.ts'
import { alteredScaleData, scaleSchema } from './scales.ts'

export const getIntervalNoteFrom = (note: Note, semitones: number): Note => {
    // OCTAVE is added for supporting "negative" intervals
    return (OCTAVE + note + semitones) % OCTAVE
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
