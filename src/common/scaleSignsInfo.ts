import { BaseScaleInfo, Note, Scale } from './types.ts'
import { Interval } from './constants.ts'
import { getIntervalNoteFrom } from './utils.ts'

const baseOrder = [Note.F, Note.C, Note.G, Note.D, Note.A, Note.E, Note.B]
export const sharpsOrder = baseOrder.slice(0, -2)
const flatsOrder = baseOrder.reverse().slice(0, -2)

export const getScalesList = (
    scale: Scale.Major | Scale.NaturalMinor,
    type: 'flat' | 'sharp'
) => {
    const interval = type === 'sharp' ? Interval.Fifth : Interval.Fourth
    const order = type === 'sharp' ? sharpsOrder : flatsOrder
    let currentNote = scale === Scale.Major ? Note.C : Note.A

    const result: BaseScaleInfo[] = [
        {
            numberOfSigns: 0,
            baseNote: currentNote,
            sign: null,
            scale,
        },
    ]

    order.forEach((_, index) => {
        currentNote = getIntervalNoteFrom(currentNote, interval)
        result.push({
            numberOfSigns: index + 1,
            baseNote: currentNote,
            sign: type,
            scale,
        })
    })

    return result
}

export const FLAT_MAJOR_SCALES = getScalesList(Scale.Major, 'flat')
export const SHARP_MAJOR_SCALES = getScalesList(Scale.Major, 'sharp')
export const FLAT_MINOR_SCALES = getScalesList(Scale.NaturalMinor, 'flat')
export const SHARP_MINOR_SCALES = getScalesList(Scale.NaturalMinor, 'sharp')

export const getScaleInfo = (scale: Scale, baseNote: Note) => {
    const searchCallback = (s: BaseScaleInfo) => s.baseNote === baseNote
    if (scale === Scale.Major) {
        return (
            FLAT_MAJOR_SCALES.find(searchCallback) ||
            SHARP_MAJOR_SCALES.find(searchCallback) ||
            null
        )
    } else if (scale === Scale.NaturalMinor) {
        return (
            FLAT_MINOR_SCALES.find(searchCallback) ||
            SHARP_MINOR_SCALES.find(searchCallback) ||
            null
        )
    }
    return null
}
