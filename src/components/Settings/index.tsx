import React from 'react'
import { Group } from './Group.tsx'
import { Tuning } from './Tuning.tsx'
import { Flex } from '@radix-ui/themes'
import { ScaleForm } from './Scale.tsx'

export const Settings = React.memo(() => {
    return (
        <Flex gap="3" wrap="wrap" align="stretch">
            <Group title="Tuning">
                <Tuning />
            </Group>
            <Group title="Scale">
                <ScaleForm />
            </Group>
        </Flex>
    )
})
