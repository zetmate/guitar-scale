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

export type Color = 'green' | 'blue' | 'orange' | 'yellow' | 'pink' | 'violet'

export type ThemeMode = 'light' | 'dark'
