import { AlteredScale, Color, Note, Scale } from './types.ts'

export const DEFAULT_STRING_NOTES = [
    Note.E,
    Note.B,
    Note.G,
    Note.D,
    Note.A,
    Note.E,
    Note.B,
    Note.E,
] as const

export enum Interval {
    Unison,
    MinSecond,
    MajSecond,
    MinThird,
    MajThird,
    Fourth,
    DimFifth,
    Fifth,
    MinSixth,
    MajSixth,
    MinSeventh,
    MajSeventh,
    Octave,
}

export const ALL_NOTES = [
    Note.A,
    Note['A#/Bb'],
    Note.B,
    Note.C,
    Note['C#/Db'],
    Note.D,
    Note['D#/Eb'],
    Note.E,
    Note.F,
    Note['F#/Gb'],
    Note.G,
    Note['G#/Ab'],
] as const

export const ALL_ALTERED_SCALES = new Set([
    AlteredScale.HarmonicMinor,
    AlteredScale.Locrian,
    AlteredScale.Dorian,
    AlteredScale.Lydian,
    AlteredScale.Phrygian,
    AlteredScale.Mixolydian,
])

export const ALL_SCALES = [
    Scale.Major,
    Scale.NaturalMinor,
    ...ALL_ALTERED_SCALES,
]

export const ALL_COLORS: readonly Color[] = [
    'green',
    'blue',
    'orange',
    'yellow',
    'pink',
    'violet',
] as const

export const MAX_STRINGS = DEFAULT_STRING_NOTES.length
export const MIN_STRINGS = 4
export const NUMBER_OF_FRETS = 24

export const ICON_SIZE = 32
