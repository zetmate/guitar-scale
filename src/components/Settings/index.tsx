import React from 'react'
import { Group } from './Group.tsx'
import { Tuning } from './Tuning.tsx'
import { Flex } from '@radix-ui/themes'

export const Settings = React.memo(() => {
    return (
        <Flex gap="3" wrap="wrap">
            <Group title="Tuning">
                <Tuning />
            </Group>
        </Flex>
    )
})
