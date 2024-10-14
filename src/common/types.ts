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

export type ScaleSchema = number[]

export enum Scale {
    Major = 'Major',
    NaturalMinor = 'Minor',
    Octatonic = 'Octatonic',
    Wholetone = 'Wholetone',
}

export enum AlteredScale {
    HarmonicMinor = 'harmonic minor',
    DoubleHarmonic = 'double harmonic',
    Phrygian = 'phrygian',
    Locrian = 'locrian',
    Lydian = 'lydian',
    Dorian = 'dorian',
    Mixolydian = 'mixolydian mode',
}

export type AnyScale = Scale | AlteredScale

export enum Degree {
    I,
    II,
    III,
    IV,
    V,
    VI,
    VII,
}

export interface BaseScaleInfo {
    sign: 'flat' | 'sharp' | null
    numberOfSigns: number
    baseNote: Note
    scale: Scale
}

export interface AlteredScaleInfo {
    name: AlteredScale
    base: Scale
    alterations: Map<Degree, 'flat' | 'sharp'>
}

export interface ScaleDegreesInfo {
    hasTonic: boolean
    hasDominant: boolean
    hasSubdominant: boolean
    noteDegreeMap: Map<Note, Degree>
}

export type Color =
    | 'green'
    | 'blue'
    | 'orange'
    | 'yellow'
    | 'pink'
    | 'violet'
    | 'red'
    | 'gray'
    | 'cyan'

export type ThemeMode = 'light' | 'dark'
