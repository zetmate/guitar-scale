import React from 'react'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { ThemeButton, ThemeButtonProps } from './ThemeButton.tsx'

export const Header = React.memo(
    ({ setTheme, currentTheme }: ThemeButtonProps) => (
        <Flex justify="between" gapX="3">
            <Box flexShrink="0">
                <Heading as="h1" size="8">
                    guitar-scale
                </Heading>
                <Box>
                    <Text>by zetmate</Text>
                </Box>
            </Box>
            <ThemeButton setTheme={setTheme} currentTheme={currentTheme} />
        </Flex>
    )
)
