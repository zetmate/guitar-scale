import { Badge, Text } from '@radix-ui/themes'
import { Color, Note, noteName } from '../../common/types.ts'
import { Cell } from './Grid/Cell.tsx'

interface FretProps {
    note: Note
    color?: Color
}

export const Fret = ({ note, color }: FretProps) => {
    return (
        <Cell>
            {color ? (
                <Badge size="3" color={color || 'gray'}>
                    {noteName[note]}
                </Badge>
            ) : (
                <Text size="2">{noteName[note]}</Text>
            )}
        </Cell>
    )
}
