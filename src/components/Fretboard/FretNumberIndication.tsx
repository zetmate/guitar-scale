import { Flex, useThemeContext } from '@radix-ui/themes'
import { NUMBER_OF_FRETS } from '../../common/constants.ts'
import { Row } from './Grid/Row.tsx'

interface Props {
    fretNumber: number
}

const dot = [3, 5, 7, 9, 15]
const doubleDot = [12]

const Dot = () => {
    const theme = useThemeContext()
    const mode = theme.appearance === 'inherit' ? 'dark' : theme.appearance

    return (
        <div
            style={{
                width: '1vh',
                height: '1vh',
                flexShrink: '0',
                borderRadius: '100%',
                background: mode === 'dark' ? '#ddd' : '#333',
            }}
        />
    )
}

const DoubleDot = () => (
    <Flex gap="1">
        <Dot />
        <Dot />
    </Flex>
)

const IndicationCell = ({ fretNumber }: Props) => {
    if (dot.includes(fretNumber)) {
        return <Dot />
    }
    if (doubleDot.includes(fretNumber)) {
        return <DoubleDot />
    }
    return null
}

const fretboard: number[] = []
for (let i = 0; i < NUMBER_OF_FRETS; i++) {
    fretboard.push(i)
}

export const FretNumberIndication = () => {
    return (
        <Row variant="short" firstCellContent={null}>
            {fretboard.map((_, index) => ({
                key: index,
                node: <IndicationCell fretNumber={index + 1} />,
            }))}
        </Row>
    )
}
