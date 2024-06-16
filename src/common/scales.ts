import {
    Degree,
    IAlteredScale,
    AlteredScale,
    Scale,
    ScaleSchema,
} from './types.ts'

export const scaleSchema: Record<Scale, ScaleSchema> = {
    [Scale.Major]: [2, 2, 1, 2, 2, 2, 1],
    [Scale.NaturalMinor]: [2, 1, 2, 2, 1, 2, 2],
}

export const alteredScaleData: Record<AlteredScale, IAlteredScale> = {
    [AlteredScale.HarmonicMinor]: {
        name: AlteredScale.HarmonicMinor,
        base: Scale.NaturalMinor,
        alterations: new Map([[Degree.VII, 'sharp']]),
    },
    [AlteredScale.Locrian]: {
        name: AlteredScale.Locrian,
        base: Scale.NaturalMinor,
        alterations: new Map([
            [Degree.II, 'flat'],
            [Degree.V, 'flat'],
        ]),
    },
    [AlteredScale.Dorian]: {
        name: AlteredScale.Dorian,
        base: Scale.NaturalMinor,
        alterations: new Map([[Degree.VI, 'sharp']]),
    },
    [AlteredScale.Phrygian]: {
        name: AlteredScale.Phrygian,
        base: Scale.NaturalMinor,
        alterations: new Map([[Degree.II, 'flat']]),
    },
    [AlteredScale.Lydian]: {
        name: AlteredScale.Lydian,
        base: Scale.Major,
        alterations: new Map([[Degree.IV, 'sharp']]),
    },
    [AlteredScale.Mixolydian]: {
        name: AlteredScale.Mixolydian,
        base: Scale.Major,
        alterations: new Map([[Degree.V, 'flat']]),
    },
}
