import React, { PropsWithChildren } from 'react'
import { Box, Heading } from '@radix-ui/themes'
import { useSettings } from './useSettings.ts'
import './group.css'

interface GroupProps extends PropsWithChildren {
    title: string
}

export const Group = React.memo(({ children, title }: GroupProps) => {
    const { theme } = useSettings()
    return (
        <Box flexShrink="0">
            <div
                className={`group ${theme === 'dark' ? 'card_dark' : 'card_light'}`}
            >
                <Box pb="2">
                    <Heading size="5" as="h3">
                        {title}
                    </Heading>
                </Box>
                {children}
            </div>
        </Box>
    )
})
