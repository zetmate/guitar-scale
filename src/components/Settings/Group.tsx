import React, { PropsWithChildren } from 'react'
import { Box, Card, Heading } from '@radix-ui/themes'

interface GroupProps extends PropsWithChildren {
    title: string
}

export const Group = React.memo(({ children, title }: GroupProps) => {
    return (
        <Box flexShrink="0">
            <Card>
                <Box pb="2">
                    <Heading size="5" as="h3">
                        {title}
                    </Heading>
                </Box>
                {children}
            </Card>
        </Box>
    )
})
