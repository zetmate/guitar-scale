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
    [Note['A#/Bb']]: 'Bb',
    [Note.B]: 'B',
    [Note.C]: 'C',
    [Note['C#/Db']]: 'Db',
    [Note.D]: 'D',
    [Note['D#/Eb']]: 'Eb',
    [Note.E]: 'E',
    [Note.F]: 'F',
    [Note['F#/Gb']]: 'Gb',
    [Note.G]: 'G',
    [Note['G#/Ab']]: 'sAb',
}

export const noteNameSharp: Record<Note, string> = {
    [Note.A]: 'A',
    [Note['A#/Bb']]: 'A#',
    [Note.B]: 'B',
    [Note.C]: 'C',
    [Note['C#/Db']]: 'C#',
    [Note.D]: 'D',
    [Note['D#/Eb']]: 'D#',
    [Note.E]: 'E',
    [Note.F]: 'F',
    [Note['F#/Gb']]: 'F#',
    [Note.G]: 'G',
    [Note['G#/Ab']]: 'G#',
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

export interface BaseScaleInfo {
    sign: 'flat' | 'sharp'
    numberOfSigns: number
    baseNote: Note
    scale: Scale
}

export interface AlteredScaleInfo {
    name: AlteredScale
    base: Scale
    alterations: Map<Degree, 'flat' | 'sharp'>
}

export type Color = 'green' | 'blue' | 'orange' | 'yellow' | 'pink' | 'violet'

export type ThemeMode = 'light' | 'dark'
