import React from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { String } from './String.tsx'
import { FretNumberIndication } from './FretNumberIndication.tsx'
import { useSettings } from '../Settings/useSettings.ts'
import './fretboard.css'

export const Fretboard = React.memo(() => {
    const { tuning } = useSettings()
    return (
        <ScrollArea size="2" type="always" scrollbars="horizontal">
            <div className="fretboard">
                <Flex direction="column" gapY="2">
                    {tuning.map((stringNote, index) => (
                        <String
                            key={`${stringNote}_${index}`}
                            stringNote={stringNote}
                        />
                    ))}
                    <FretNumberIndication />
                </Flex>
            </div>
        </ScrollArea>
    )
})
