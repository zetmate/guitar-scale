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

export enum Scales {
    Major = 'major',
    NaturalMinor = 'natural minor',
    HarmonicMinor = 'harmonic minor',
    Phrygian = 'phrygian',
    Locrian = 'locrian',
    Lydian = 'lydian',
    Dorian = 'dorian',
}
