import { Badge, Box, Card, Flex, Text } from '@radix-ui/themes'
import { Color, Note, noteName } from '../common/types.ts'

interface FretProps {
    note: Note
    color?: Color
}

export const Fret = ({ note, color }: FretProps) => {
    return (
        <Box>
            <Card>
                <Flex
                    width="7vh"
                    height="10vh"
                    flexShrink="0"
                    justify="center"
                    align="center"
                >
                    {color ? (
                        <Badge size="3" color={color || 'gray'}>
                            {noteName[note]}
                        </Badge>
                    ) : (
                        <Text size="2">{noteName[note]}</Text>
                    )}
                </Flex>
            </Card>
        </Box>
    )
}
