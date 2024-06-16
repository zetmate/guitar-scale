import { AlteredScale, Color, Note, Scale } from '../../common/types.ts'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
    getAlteredScaleNotes,
    getScaleNotes,
    isScaleAltered,
} from '../../common/utils.ts'
import { useLocalStorage } from '../LocalStorage/context.tsx'

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

interface SettingsContextValue extends Settings {
    scale: Settings['scale'] & {
        notes: Note[]
        notesSet: Set<Note>
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
    const notes = isScaleAltered(type)
        ? getAlteredScaleNotes(root, type)
        : getScaleNotes(settings.scale.root, type)

    return {
        ...settings,
        scale: {
            ...settings.scale,
            notes,
            notesSet: new Set<Note>(notes),
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
