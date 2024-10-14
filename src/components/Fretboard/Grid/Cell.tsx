import React, { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'
import { useSettings } from '../../Settings/useSettings.ts'
import './grid.css'
import '../../../common/styles.css'

interface CellProps extends PropsWithChildren {
    variant?: 'regular' | 'short' | 'narrow'
    className?: string
}

const CELL_WIDTH = '7vh'
const NARROW_CELL_WIDTH = '5vh'
const CELL_HEIGHT = '3vh'
const SHORT_CELL_HEIGHT = '1.5vh'

export const Cell = React.memo(
    ({ children, variant = 'regular', className }: CellProps) => {
        const { theme } = useSettings()
        const height = variant === 'short' ? SHORT_CELL_HEIGHT : CELL_HEIGHT

        if (variant === 'narrow') {
            return (
                <div
                    className={`grid__cell grid__narrow_cell ${className || ''}`}
                >
                    <Flex
                        pr="1"
                        align="center"
                        justify={'start'}
                        flexShrink="0"
                        width={NARROW_CELL_WIDTH}
                        height={height}
                    >
                        {children}
                    </Flex>
                </div>
            )
        }
        return (
            <div
                className={`grid__cell ${theme === 'dark' ? 'card_dark' : 'card_light'}${className || ''}`}
            >
                <Flex
                    width={CELL_WIDTH}
                    height={height}
                    flexShrink="0"
                    justify="center"
                    align="center"
                >
                    {children}
                </Flex>
            </div>
        )
    }
)
