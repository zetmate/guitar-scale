import {
    AlteredScaleInfo,
    AnyScale,
    Color,
    Note,
    Scale,
    ScaleDegreesInfo,
    ThemeMode,
} from '../../common/types.ts'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
    getAlterationsSet,
    getAlteredScaleNotes,
    getPreferredNaming,
    getScaleDegreeInfo,
    getScaleNotes,
    isScaleAltered,
} from '../../common/utils.ts'
import { useLocalStorage } from '../LocalStorage/context.tsx'
import { getScaleInfo } from '../../common/scaleSignsInfo.ts'
import { alteredScaleData } from '../../common/scaleDefinitions.ts'

const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme: ThemeMode = preferDark ? 'dark' : 'light'

export interface Settings {
    theme: ThemeMode
    tuning: Note[]
    color: {
        default: Color
        alterations: Color
        tonic: Color
        dominant: Color
        subdominant: Color
    }
    showAllNotes: boolean
    scale: {
        root: Note
        type: AnyScale
    }
}

type SettingsUpdater = (prevSettings: Settings) => Settings

export interface SettingsContextValue extends Settings {
    scale: Settings['scale'] & {
        notes: Note[]
        notesSet: Set<Note>
        degreesInfo: ScaleDegreesInfo
        preferredNaming: 'flat' | 'sharp'
        alteredScaleInfo?: AlteredScaleInfo | null
        alterationsSet: Set<Note>
    }
    setSettings: (updater: SettingsUpdater) => void
}

const defaultSettings: Settings = {
    theme: defaultTheme,
    tuning: [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E],
    showAllNotes: false,
    color: {
        default: 'blue',
        alterations: 'orange',
        tonic: 'green',
        dominant: 'blue',
        subdominant: 'blue',
    },
    scale: {
        root: Note.A,
        type: Scale.NaturalMinor,
    },
}

const contextValueFromSettings = (
    settings: Settings,
    setSettings: SettingsContextValue['setSettings']
): SettingsContextValue => {
    const { type, root } = settings.scale
    const isAltered = isScaleAltered(type)
    const notes = isAltered
        ? getAlteredScaleNotes(root, type)
        : getScaleNotes(settings.scale.root, type)

    const baseScale = isAltered ? alteredScaleData[type].base : type
    const baseScaleInfo = getScaleInfo(baseScale, root)
    const alteredScaleInfo = isAltered ? alteredScaleData[type] : null

    return {
        ...settings,
        scale: {
            ...settings.scale,
            notes,
            notesSet: new Set<Note>(notes),
            preferredNaming: getPreferredNaming(
                baseScaleInfo,
                alteredScaleInfo
            ),
            degreesInfo: getScaleDegreeInfo(
                type,
                notes,
                alteredScaleInfo?.alterations
            ),
            alteredScaleInfo,
            alterationsSet: alteredScaleInfo
                ? getAlterationsSet(alteredScaleInfo, notes)
                : new Set(),
        },
        setSettings,
    }
}

const defaultContextValue = contextValueFromSettings(defaultSettings, () => {})

export const SettingsContext =
    React.createContext<SettingsContextValue>(defaultContextValue)

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const { settings: savedSettings, updateSettings } = useLocalStorage()
    const [settings, setSettings] = useState<Settings>(
        savedSettings || defaultSettings
    )

    const value: SettingsContextValue = useMemo(
        () =>
            contextValueFromSettings(settings, (updater) => {
                const newSettings = updater(settings)
                updateSettings(newSettings)
                setSettings(newSettings)
            }),
        [settings, setSettings, updateSettings]
    )

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}
