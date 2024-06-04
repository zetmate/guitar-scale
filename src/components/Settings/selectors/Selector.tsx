import { Box, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'

interface SelectorProps<T> {
    value?: T
    label?: string
    onSelect: (note: T) => void
    items: T[]
    getItemText: (item?: T) => string
}

export const Selector = <T,>({
    onSelect,
    value,
    label,
    items,
    getItemText,
}: SelectorProps<T>) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Flex direction="column" align="start">
                    {label && (
                        <Box flexShrink="0" pb="2">
                            <Text weight="medium" size="2">
                                {label}
                            </Text>
                        </Box>
                    )}
                    <Button variant="soft">
                        {getItemText(value)}
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </Flex>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
                {items.map((item) => {
                    const itemText = getItemText(item)
                    return (
                        <DropdownMenu.Item
                            key={itemText}
                            onClick={() => onSelect(item)}
                        >
                            {itemText}
                        </DropdownMenu.Item>
                    )
                })}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
