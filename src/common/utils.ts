import { Note, Scale, ScaleNotes } from './types.ts'
import { OCTAVE } from './constants.ts'
import { scaleToSchema } from './scales.ts'

export const getIntervalNoteFrom = (note: Note, semitones: number): Note => {
    return (note + semitones) % OCTAVE
}

export const getScaleNotes = (root: Note, scale: Scale): ScaleNotes => {
    const schema = scaleToSchema[scale]

    let nextNote = root
    const result: Note[] = []

    for (const interval of schema) {
        result.push(nextNote)
        nextNote = getIntervalNoteFrom(nextNote, interval)
    }

    return result as ScaleNotes
}

export const degreeToIndex = (degree: number): number => {
    return degree - 1
}

export const indexToDegree = (index: number): number => {
    return index + 1
}
