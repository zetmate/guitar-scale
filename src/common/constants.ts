import { AlteredScale, AnyScale, Color, Note, Scale } from './types.ts'

export const FLAT = '♭'
export const SHARP = '♯'
export const DOUBLE_SHARP = '𝄪'
export const DOUBLE_FLAT = '𝄫'
export const NATURAL = '♮'

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

export const BASE_DIATONIC_SCALES: AnyScale[] = [
    Scale.Major,
    Scale.NaturalMinor,
]

export const NON_DIATONIC_SCALES: AnyScale[] = [
    Scale.Wholetone,
    Scale.Octatonic,
]

export const DIATONIC_ALTERED_SCALES = new Set([
    AlteredScale.HarmonicMinor,
    AlteredScale.DoubleHarmonic,
    AlteredScale.Locrian,
    AlteredScale.Dorian,
    AlteredScale.Lydian,
    AlteredScale.Phrygian,
    AlteredScale.Mixolydian,
    AlteredScale.Eclipse,
])

export const ALL_ALTERED_SCALES = new Set([...DIATONIC_ALTERED_SCALES])

export const ALL_DIATONIC_SCALES: AnyScale[] = [
    ...BASE_DIATONIC_SCALES,
    ...ALL_ALTERED_SCALES,
]

export const ALL_SCALES = [
    Scale.Major,
    Scale.NaturalMinor,
    Scale.Octatonic,
    Scale.Wholetone,
    ...ALL_ALTERED_SCALES,
]

export const ALL_COLORS: readonly Color[] = [
    'green',
    'cyan',
    'blue',
    'violet',
    'pink',
    'red',
    'orange',
    'yellow',
    'gray',
] as const

export const MAX_STRINGS = DEFAULT_STRING_NOTES.length
export const MIN_STRINGS = 4
export const NUMBER_OF_FRETS = 24

export const ICON_SIZE = 32

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

export const noteNameFlat: Record<Note, string> = {
    [Note.A]: 'A',
    [Note['A#/Bb']]: 'B♭',
    [Note.B]: 'B',
    [Note.C]: 'C',
    [Note['C#/Db']]: 'D♭',
    [Note.D]: 'D',
    [Note['D#/Eb']]: 'E♭',
    [Note.E]: 'E',
    [Note.F]: 'F',
    [Note['F#/Gb']]: 'G♭',
    [Note.G]: 'G',
    [Note['G#/Ab']]: 'A♭',
}

export const noteNameSharp: Record<Note, string> = {
    [Note.A]: 'A',
    [Note['A#/Bb']]: 'A♯',
    [Note.B]: 'B',
    [Note.C]: 'C',
    [Note['C#/Db']]: 'C♯',
    [Note.D]: 'D',
    [Note['D#/Eb']]: 'D♯',
    [Note.E]: 'E',
    [Note.F]: 'F',
    [Note['F#/Gb']]: 'F♯',
    [Note.G]: 'G',
    [Note['G#/Ab']]: 'G♯',
}
