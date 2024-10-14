import React, { useCallback } from 'react'
import { Selector } from './selectors/Selector.tsx'
import { Color } from '../../common/types.ts'
import { ALL_COLORS } from '../../common/constants.ts'
import { Settings } from './Provider.tsx'
import { useSettings } from './useSettings.ts'
import { isScaleAltered } from '../../common/utils.ts'

const getUpdatedColors = (
    prevSettings: Settings,
    changedType: keyof Settings['color'],
    newValue: Color
): Partial<Settings['color']> => {
    if (changedType !== 'default') {
        return { [changedType]: newValue }
    }
    const colorsArray = Object.entries(prevSettings.color)
    const matchingColors = colorsArray.filter(([, color]) => {
        return color === prevSettings.color.default
    })
    return matchingColors.reduce<Partial<Settings['color']>>(
        (result, [key]) => {
            result[key as keyof Settings['color']] = newValue
            return result
        },
        {}
    )
}

export const ColorsForm = React.memo(() => {
    const { setSettings, color, scale } = useSettings()

    const onSelectColor = useCallback(
        (color: Color, type: keyof Settings['color']) => {
            setSettings((prevSettings) => {
                return {
                    ...prevSettings,
                    color: {
                        ...prevSettings.color,
                        ...getUpdatedColors(prevSettings, type, color),
                    },
                }
            })
        },
        [setSettings]
    )

    const getCommonProps = useCallback(
        (
            colorProp: keyof Settings['color'],
            fallbackColor: Color = color.default
        ) => ({
            items: ALL_COLORS,
            onSelect: (c: Color) => {
                onSelectColor(c, colorProp)
            },
            value: color[colorProp] || fallbackColor,
            color: color[colorProp] || fallbackColor,
            getItemColor: (item?: Color) => item,
        }),
        [color, onSelectColor]
    )

    return (
        <div className="group__column">
            <div className="group__row">
                <Selector<Color>
                    {...getCommonProps('default')}
                    buttonText="Default"
                />
                {scale.degreesInfo.hasTonic && (
                    <Selector<Color>
                        {...getCommonProps('tonic', 'green')}
                        buttonText="Tonic"
                    />
                )}
                {isScaleAltered(scale.type) && (
                    <Selector<Color>
                        {...getCommonProps('alterations', 'orange')}
                        buttonText="Alterations"
                    />
                )}
            </div>
            {(scale.degreesInfo.hasSubdominant ||
                scale.degreesInfo.hasSubdominant) && (
                <div className="group__row">
                    {scale.degreesInfo.hasDominant && (
                        <Selector<Color>
                            {...getCommonProps('dominant')}
                            buttonText="Dominant"
                        />
                    )}
                    {scale.degreesInfo.hasSubdominant && (
                        <Selector<Color>
                            {...getCommonProps('subdominant')}
                            buttonText="Subdominant"
                        />
                    )}
                </div>
            )}
        </div>
    )
})
