import { Flex, Text } from '@radix-ui/themes'
import { NUMBER_OF_FRETS } from '../../common/constants.ts'
import { Row } from './Grid/Row.tsx'
import './fretboard.css'

interface Props {
    fretNumber: number
}

const dot = [3, 5, 7, 9, 15, 17, 19, 21, 27]
const doubleDot = [12, 24]

const Dot = () => {
    return <div className="fretboard__dot" />
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
    return (
        <Text color="gray" size="1">
            {fretNumber}
        </Text>
    )
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
