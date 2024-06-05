import { useEffect, useState } from 'react'
import { Box, Button, Callout, Flex, Heading, Text } from '@radix-ui/themes'
import { useLocalStorage } from './LocalStorage/context.tsx'

export const MobileWarningPopup = () => {
    const { hasSeenThePopup, setHasSeenThePopup } = useLocalStorage()
    const [screenWidth, setScreenWidth] = useState<number>()
    const [isOpen, setIsOpen] = useState<boolean>()

    useEffect(() => {
        // the condition is just in case it gets mounted twice (can happen in react 18)
        if (!screenWidth) {
            setScreenWidth(window.innerWidth)
            setIsOpen(true)
        }
    }, [])

    if (!screenWidth || !isOpen || hasSeenThePopup || screenWidth > 600) {
        return null
    }
    return (
        <Flex width="250px">
            <Callout.Root color="gray" role="alert">
                <Callout.Text>
                    <div>
                        <Box pb="4">
                            <Heading size="5">Mobile device</Heading>
                        </Box>
                        <Text>
                            We are sorry, the app is not optimized for mobile
                            devices. It still works but is likely to look ugly.
                            We'll add mobile devices support in the future.
                        </Text>
                        <Flex justify="end" pt="4">
                            <Button
                                variant="surface"
                                color="blue"
                                onClick={() => {
                                    setIsOpen(false)
                                    setHasSeenThePopup()
                                }}
                            >
                                <b>Understood</b>
                            </Button>
                        </Flex>
                    </div>
                </Callout.Text>
            </Callout.Root>
        </Flex>
    )
}
