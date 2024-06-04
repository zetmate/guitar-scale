import { Scale, ScaleSchema } from './types.ts'

export const scaleToSchema: Record<Scale, ScaleSchema> = {
    [Scale.Major]: [2, 2, 1, 2, 2, 2, 1],
    [Scale.NaturalMinor]: [2, 1, 2, 2, 1, 2, 2],
}
