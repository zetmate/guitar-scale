import {
    Box,
    Button,
    DropdownMenu,
    Flex,
    Text,
    ButtonProps,
} from '@radix-ui/themes'
import { Color } from '../../../common/types.ts'
import { capitalize } from '../../../common/utils.ts'

interface SelectorProps<T> {
    value?: T
    label?: string
    onSelect: (note: T) => void
    items: T[]
    getItemText?: (item?: T) => string
    getItemColor?: (item?: T) => Color | undefined
    color?: ButtonProps['color']
    buttonText?: string
}

export const Selector = <T,>({
    onSelect,
    value,
    label,
    items,
    getItemText = (item) => capitalize(`${item}`),
    getItemColor = () => undefined,
    color,
    buttonText,
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
                    <Button variant="soft" color={color}>
                        {(buttonText && buttonText + ': ') || ''}
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
                            color={getItemColor(item)}
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
