import React, { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { Cell } from './Cell.tsx'

interface RowProps {
    firstCellContent: ReactNode
    children: { key: React.Key; node: ReactNode }[]
    variant?: 'regular' | 'short'
}

export const Row = React.memo(
    ({ children, firstCellContent, variant = 'regular' }: RowProps) => (
        <Flex gap="2" flexShrink="0" align="center">
            <Cell variant="narrow">{firstCellContent}</Cell>
            {children.map(({ key, node }) => (
                <Cell key={key} variant={variant}>
                    {node}
                </Cell>
            ))}
        </Flex>
    )
)
