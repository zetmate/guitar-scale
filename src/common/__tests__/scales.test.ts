import {
    FLAT_MAJOR_SCALES,
    FLAT_MINOR_SCALES,
    SHARP_MAJOR_SCALES,
    SHARP_MINOR_SCALES,
} from '../scaleSignsInfo.ts'
import { Note, noteName, Scale } from '../types.ts'

describe('Constants for scales', () => {
    describe('Major scales', () => {
        console.log(
            SHARP_MINOR_SCALES.map((i) => ({
                ...i,
                baseNote: noteName[i.baseNote],
            }))
        )

        it('C major has 0 signs', () => {
            const sharpScale = SHARP_MAJOR_SCALES[0]
            const flatScale = FLAT_MAJOR_SCALES[0]

            expect(flatScale.baseNote).toBe(Note.C)
            expect(flatScale.numberOfSigns).toBe(0)
            expect(flatScale.scale).toBe(Scale.Major)

            expect(sharpScale.baseNote).toBe(Note.C)
            expect(sharpScale.numberOfSigns).toBe(0)
            expect(sharpScale.scale).toBe(Scale.Major)
        })

        it('A minor has 0 signs', () => {
            const sharpScale = SHARP_MINOR_SCALES[0]
            const flatScale = FLAT_MINOR_SCALES[0]

            expect(flatScale.baseNote).toBe(Note.A)
            expect(flatScale.numberOfSigns).toBe(0)
            expect(flatScale.scale).toBe(Scale.NaturalMinor)

            expect(sharpScale.baseNote).toBe(Note.A)
            expect(sharpScale.numberOfSigns).toBe(0)
            expect(sharpScale.scale).toBe(Scale.NaturalMinor)
        })

        it('E major has 4 sharps', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                SHARP_MAJOR_SCALES[4]

            expect(baseNote).toBe(Note.E)
            expect(numberOfSigns).toBe(4)
            expect(sign).toBe('sharp')
            expect(scale).toBe(Scale.Major)
        })

        it('B major has 5 sharps', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                SHARP_MAJOR_SCALES[5]

            expect(baseNote).toBe(Note.B)
            expect(numberOfSigns).toBe(5)
            expect(sign).toBe('sharp')
            expect(scale).toBe(Scale.Major)
        })

        it('Eb major has 3 flats', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                FLAT_MAJOR_SCALES[3]

            expect(baseNote).toBe(Note['D#/Eb'])
            expect(numberOfSigns).toBe(3)
            expect(sign).toBe('flat')
            expect(scale).toBe(Scale.Major)
        })

        it('B flat major has 2 flats', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                FLAT_MAJOR_SCALES[2]

            expect(baseNote).toBe(Note['A#/Bb'])
            expect(numberOfSigns).toBe(2)
            expect(sign).toBe('flat')
            expect(scale).toBe(Scale.Major)
        })

        it('C minor has 3 flats', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                FLAT_MINOR_SCALES[3]

            expect(baseNote).toBe(Note.C)
            expect(numberOfSigns).toBe(3)
            expect(sign).toBe('flat')
            expect(scale).toBe(Scale.NaturalMinor)
        })

        it('E minor has 1 sharp', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                SHARP_MINOR_SCALES[1]

            expect(baseNote).toBe(Note.E)
            expect(numberOfSigns).toBe(1)
            expect(sign).toBe('sharp')
            expect(scale).toBe(Scale.NaturalMinor)
        })

        it('C# minor has 4 sharps', () => {
            const { numberOfSigns, baseNote, sign, scale } =
                SHARP_MINOR_SCALES[4]

            expect(baseNote).toBe(Note['C#/Db'])
            expect(numberOfSigns).toBe(4)
            expect(sign).toBe('sharp')
            expect(scale).toBe(Scale.NaturalMinor)
        })
    })
})
