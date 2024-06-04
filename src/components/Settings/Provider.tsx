import { Color, Note, Scale } from '../../common/types.ts'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import { getScaleNotes } from '../../common/utils.ts'

interface Settings {
    tuning: Note[]
    color: {
        default: Color
    }
    showAllNotes: boolean
    scale: {
        root: Note
        type: Scale
    }
}

type SettingsUpdater = (prevSettings: Settings) => Settings

interface SettingsContextValue extends Settings {
    scale: {
        root: Note
        type: Scale
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
    const notes = getScaleNotes(settings.scale.root, settings.scale.type)
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
