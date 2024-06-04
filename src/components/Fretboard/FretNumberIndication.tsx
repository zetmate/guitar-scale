import { Box, Card, Flex, useThemeContext } from '@radix-ui/themes'
import { NUMBER_OF_FRETS } from '../../common/constants.ts'

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
                width: '2vh',
                height: '2vh',
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
    return (
        <Box>
            <Card>
                <Flex
                    width="7vh"
                    height="3vh"
                    flexShrink="0"
                    justify="center"
                    align="center"
                >
                    {dot.includes(fretNumber) ? (
                        <Dot />
                    ) : doubleDot.includes(fretNumber) ? (
                        <DoubleDot />
                    ) : null}
                </Flex>
            </Card>
        </Box>
    )
}

const fretboard: number[] = []
for (let i = 0; i < NUMBER_OF_FRETS; i++) {
    fretboard.push(i)
}

export const FretNumberIndication = () => {
    return (
        <Flex gap="2" flexShrink="0" align="center">
            <Box pr="2" flexShrink="0" width="2vh" />
            {fretboard.map((_, index) => (
                <IndicationCell fretNumber={index + 1} />
            ))}
        </Flex>
    )
}
