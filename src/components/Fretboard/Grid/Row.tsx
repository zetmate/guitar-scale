import React, { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { Cell } from './Cell.tsx'
import './grid.css'

interface RowProps {
    firstCellContent: ReactNode
    children: { key: React.Key; node: ReactNode }[]
    variant?: 'regular' | 'short'
}

export const Row = React.memo(
    ({ children, variant = 'regular', firstCellContent }: RowProps) => (
        <Flex gap="2" flexShrink="0" align="center">
            <Cell variant="narrow" className="grid__first_cell">
                {firstCellContent}
            </Cell>
            {children.map(({ key, node }) => (
                <Cell key={key} variant={variant}>
                    {node}
                </Cell>
            ))}
        </Flex>
    )
)
