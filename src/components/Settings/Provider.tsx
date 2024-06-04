import { Note, Scale } from '../../common/types.ts'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import { getScaleNotes } from '../../common/utils.ts'

interface Settings {
    tuning: Note[]
    scale: {
        root: Note
        type: Scale
    }
}

interface SettingsContextValue {
    tuning: Note[]
    scale: {
        root: Note
        type: Scale
        notes: Note[]
    }
    setSettings: (newSettings: Settings) => void
}

const defaultSettings: Settings = {
    tuning: [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E],
    scale: {
        root: Note.A,
        type: Scale.NaturalMinor,
    },
}

const contextValueFromSettings = (
    settings: Settings,
    setSettings: SettingsContextValue['setSettings']
) => ({
    ...settings,
    scale: {
        ...settings.scale,
        notes: getScaleNotes(settings.scale.root, settings.scale.type),
    },
    setSettings,
})

const defaultContextValue = contextValueFromSettings(defaultSettings, () => {})

export const SettingsContext =
    React.createContext<SettingsContextValue>(defaultContextValue)

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const [settings, setSettings] = useState<Settings>(defaultSettings)

    const value: SettingsContextValue = useMemo(
        () => contextValueFromSettings(settings, setSettings),
        [settings, setSettings]
    )

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}
