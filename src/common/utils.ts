import { Note, ScaleNotes, ScaleSchema } from './types.ts'

export const getIntervalNoteFrom = (note: Note, semitones: number): Note => {
    return (note + semitones) % OCTAVE
}

export const getScaleNotes = (root: Note, schema: ScaleSchema): ScaleNotes => {
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
