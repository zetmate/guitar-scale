import { Button } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import React, { useCallback } from 'react'
import { ThemeMode } from '../../common/types.ts'

export interface ThemeButtonProps {
    currentTheme: ThemeMode
    setTheme: (theme: ThemeMode) => void
}

const ICON_SIZE = 32

export const ThemeButton = React.memo(
    ({ currentTheme, setTheme }: ThemeButtonProps) => {
        const onSunClick = useCallback(() => {
            setTheme('light')
        }, [setTheme])

        const onMoonClick = useCallback(() => {
            setTheme('dark')
        }, [setTheme])

        return (
            <>
                {currentTheme === 'dark' ? (
                    <Button color="gray" variant="ghost" onClick={onSunClick}>
                        <MoonIcon height={ICON_SIZE} width={ICON_SIZE} />
                    </Button>
                ) : (
                    <Button color="gray" variant="ghost" onClick={onMoonClick}>
                        <SunIcon height={ICON_SIZE} width={ICON_SIZE} />
                    </Button>
                )}
            </>
        )
    }
)
