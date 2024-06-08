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

export const alteredScales: Record<AlteredScale, IAlteredScale> = {
    [AlteredScale.HarmonicMinor]: {
        name: AlteredScale.HarmonicMinor,
        base: Scale.NaturalMinor,
        alterations: [{ degree: Degree.VII, action: 'sharpen' }],
    },
    [AlteredScale.Locrian]: {
        name: AlteredScale.Locrian,
        base: Scale.NaturalMinor,
        alterations: [
            { degree: Degree.II, action: 'flatten' },
            { degree: Degree.V, action: 'flatten' },
        ],
    },
    [AlteredScale.Dorian]: {
        name: AlteredScale.Dorian,
        base: Scale.NaturalMinor,
        alterations: [{ degree: Degree.VI, action: 'sharpen' }],
    },
    [AlteredScale.Phrygian]: {
        name: AlteredScale.Phrygian,
        base: Scale.NaturalMinor,
        alterations: [{ degree: Degree.II, action: 'flatten' }],
    },
    [AlteredScale.Lydian]: {
        name: AlteredScale.Lydian,
        base: Scale.Major,
        alterations: [{ degree: Degree.IV, action: 'sharpen' }],
    },
    [AlteredScale.Mixolydian]: {
        name: AlteredScale.Mixolydian,
        base: Scale.Major,
        alterations: [{ degree: Degree.V, action: 'flatten' }],
    },
}
