import { IconButton } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import React, { useCallback } from 'react'
import { ThemeMode } from '../../common/types.ts'
import { ICON_SIZE } from '../../common/constants.ts'

export interface ThemeButtonProps {
    currentTheme: ThemeMode
    setTheme: (theme: ThemeMode) => void
}

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
                    <IconButton
                        color="gray"
                        variant="ghost"
                        onClick={onSunClick}
                    >
                        <SunIcon height={ICON_SIZE} width={ICON_SIZE} />
                    </IconButton>
                ) : (
                    <IconButton
                        color="gray"
                        variant="ghost"
                        onClick={onMoonClick}
                    >
                        <MoonIcon height={ICON_SIZE} width={ICON_SIZE} />
                    </IconButton>
                )}
            </>
        )
    }
)
