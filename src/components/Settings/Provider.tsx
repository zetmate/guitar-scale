import { AlteredScale, Color, Note, Scale } from '../../common/types.ts'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
    getAlteredScaleNotes,
    getScaleNotes,
    isScaleAltered,
} from '../../common/utils.ts'
import { useLocalStorage } from '../LocalStorage/context.tsx'
import { getScaleInfo } from '../../common/scaleSignsInfo.ts'
import { alteredScaleData } from '../../common/scaleDefinitions.ts'

export interface Settings {
    tuning: Note[]
    color: {
        default: Color
    }
    showAllNotes: boolean
    scale: {
        root: Note
        type: Scale | AlteredScale
    }
}

type SettingsUpdater = (prevSettings: Settings) => Settings

export interface SettingsContextValue extends Settings {
    scale: Settings['scale'] & {
        notes: Note[]
        notesSet: Set<Note>
        preferredNaming: 'flat' | 'sharp' | null
    }
    setSettings: (updater: SettingsUpdater) => void
}

const defaultSettings: Settings = {
    tuning: [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E],
    showAllNotes: false,
    color: {
        default: 'blue',
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

    return {
        ...settings,
        scale: {
            ...settings.scale,
            notes,
            notesSet: new Set<Note>(notes),
            preferredNaming: baseScaleInfo?.sign || null,
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
