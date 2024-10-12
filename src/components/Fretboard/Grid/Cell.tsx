import React, { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'
import { useSettings } from '../../Settings/useSettings.ts'
import './grid.css'
import '../../../common/styles.css'

interface CellProps extends PropsWithChildren {
    variant?: 'regular' | 'short' | 'narrow'
}

const CELL_WIDTH = '7vh'
const NARROW_CELL_WIDTH = '3vh'
const CELL_HEIGHT = '3vh'
const SHORT_CELL_HEIGHT = '1.5vh'

export const Cell = React.memo(
    ({ children, variant = 'regular' }: CellProps) => {
        const { theme } = useSettings()

        if (variant === 'narrow') {
            return (
                <Flex
                    px="1"
                    align="center"
                    flexShrink="0"
                    width={NARROW_CELL_WIDTH}
                >
                    {children}
                </Flex>
            )
        }
        return (
            <div
                className={`grid__cell ${theme === 'dark' ? 'card_dark' : 'card_light'}`}
            >
                <Flex
                    width={CELL_WIDTH}
                    height={
                        variant === 'short' ? SHORT_CELL_HEIGHT : CELL_HEIGHT
                    }
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
