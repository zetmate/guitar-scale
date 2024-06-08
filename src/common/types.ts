export enum Note {
    A = 0,
    'A#/Bb',
    B,
    C,
    'C#/Db',
    D,
    'D#/Eb',
    E,
    F,
    'F#/Gb',
    G,
    'G#/Ab',
}

export const noteName: Record<Note, string> = {
    [Note.A]: 'A',
    [Note['A#/Bb']]: 'A#/Bb',
    [Note.B]: 'B',
    [Note.C]: 'C',
    [Note['C#/Db']]: 'C#/Db',
    [Note.D]: 'D',
    [Note['D#/Eb']]: 'D#/Eb',
    [Note.E]: 'E',
    [Note.F]: 'F',
    [Note['F#/Gb']]: 'F#/Gb',
    [Note.G]: 'G',
    [Note['G#/Ab']]: 'G#/Ab',
}

export type ScaleSchema = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
]

export type ScaleNotes = [Note, Note, Note, Note, Note, Note, Note]

export enum Scale {
    Major = 'Major',
    NaturalMinor = 'Minor',
}

export enum AlteredScale {
    HarmonicMinor = 'harmonic minor',
    Phrygian = 'phrygian',
    Locrian = 'locrian',
    Lydian = 'lydian',
    Dorian = 'dorian',
    Mixolydian = 'mixolydian mode',
}

export enum Degree {
    I,
    II,
    III,
    IV,
    V,
    VI,
    VII,
}

export interface IAlteredScale {
    name: AlteredScale
    base: Scale
    alterations: { degree: Degree; action: 'sharpen' | 'flatten' }[]
}

export type Color = 'green' | 'blue' | 'orange' | 'yellow' | 'pink' | 'violet'

export type ThemeMode = 'light' | 'dark'
