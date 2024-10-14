import React, { useCallback } from 'react'
import { Flex } from '@radix-ui/themes'
import { Selector } from './selectors/Selector.tsx'
import { Color } from '../../common/types.ts'
import { ALL_COLORS } from '../../common/constants.ts'
import { Settings } from './Provider.tsx'
import { useSettings } from './useSettings.ts'
import { isScaleAltered } from '../../common/utils.ts'

export const ColorsForm = React.memo(() => {
    const { setSettings, color, scale } = useSettings()

    const onSelectColor = useCallback(
        (color: Color, type: keyof Settings['color']) => {
            setSettings((prevSettings) => {
                return {
                    ...prevSettings,
                    color: {
                        ...prevSettings.color,
                        [type]: color,
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
        <Flex direction="column" gap="3">
            <Flex direction="row" gap="3">
                <Selector<Color>
                    {...getCommonProps('default')}
                    buttonText="Default color"
                />
                {isScaleAltered(scale.type) && (
                    <Selector<Color>
                        {...getCommonProps('alterations', ALL_COLORS[2])}
                        buttonText="Alts color"
                    />
                )}
                {scale.degreesInfo.hasTonic && (
                    <Selector<Color>
                        {...getCommonProps('tonic')}
                        buttonText="Tonic color"
                    />
                )}
            </Flex>
            {(scale.degreesInfo.hasSubdominant ||
                scale.degreesInfo.hasSubdominant) && (
                <Flex direction="row" gap="3">
                    {scale.degreesInfo.hasTonic && (
                        <Selector<Color>
                            {...getCommonProps('dominant')}
                            buttonText="Dominant color"
                        />
                    )}
                    {scale.degreesInfo.hasSubdominant && (
                        <Selector<Color>
                            {...getCommonProps('subdominant')}
                            buttonText="Subominant color"
                        />
                    )}
                </Flex>
            )}
        </Flex>
    )
})
