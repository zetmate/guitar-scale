import React from 'react'
import { Box, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { ThemeButton, ThemeButtonProps } from './ThemeButton.tsx'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { ICON_SIZE } from '../../common/constants.ts'
import { PresetConfig } from './PresetConfig.tsx'

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
            <Flex align="center" gap="4">
                <PresetConfig />
                <ThemeButton setTheme={setTheme} currentTheme={currentTheme} />
                <a
                    href="https://github.com/zetmate/guitar-scale"
                    target="_blank"
                >
                    <IconButton variant="ghost" color="gray">
                        <GitHubLogoIcon width={ICON_SIZE} height={ICON_SIZE} />
                    </IconButton>
                </a>
            </Flex>
        </Flex>
    )
)
