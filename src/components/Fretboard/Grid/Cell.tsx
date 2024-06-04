import React, { PropsWithChildren } from 'react'
import { Box, Card, Flex } from '@radix-ui/themes'

interface CellProps extends PropsWithChildren {
    variant?: 'regular' | 'short' | 'narrow'
}

const CELL_WIDTH = '7vh'
const NARROW_CELL_WIDTH = '5.5vh'
const CELL_HEIGHT = '3vh'
const SHORT_CELL_HEIGHT = '1.5vh'

export const Cell = React.memo(
    ({ children, variant = 'regular' }: CellProps) => {
        if (variant === 'narrow') {
            return (
                <Flex
                    pl="1"
                    align="center"
                    flexShrink="0"
                    width={NARROW_CELL_WIDTH}
                >
                    {children}
                </Flex>
            )
        }
        return (
            <Box>
                <Card>
                    <Flex
                        width={CELL_WIDTH}
                        height={
                            variant === 'short'
                                ? SHORT_CELL_HEIGHT
                                : CELL_HEIGHT
                        }
                        flexShrink="0"
                        justify="center"
                        align="center"
                    >
                        {children}
                    </Flex>
                </Card>
            </Box>
        )
    }
)
