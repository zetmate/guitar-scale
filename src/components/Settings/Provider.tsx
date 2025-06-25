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
    getNoteNameMap,
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
    academicNotation: boolean
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
        noteNameMap: Record<Note, string>
        notesSet: Set<Note>
        degreesInfo: ScaleDegreesInfo
        baseNaming: 'flat' | 'sharp' | null
        alteredScaleInfo?: AlteredScaleInfo | null
        alterationsSet: Set<Note>
        containsAcademicNotation: boolean
    }
    preset: Settings
    setSettings: (updater: SettingsUpdater) => void
}

export const defaultSettings: Settings = {
    theme: defaultTheme,
    tuning: [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E],
    showAllNotes: false,
    academicNotation: false,
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

    const notesSet = new Set<Note>(notes)

    const baseScale = isAltered ? alteredScaleData[type].base : type
    const baseScaleInfo = getScaleInfo(baseScale, root)
    const alteredScaleInfo = isAltered ? alteredScaleData[type] : null
    const baseNotes = isAltered
        ? getScaleNotes(settings.scale.root, baseScale)
        : notes

    const { noteNameMap, containsAcademicNotation } = getNoteNameMap({
        scaleType: type,
        notes,
        baseNotes,
        preferredNaming: getPreferredNaming(baseScaleInfo),
        alterations: alteredScaleInfo?.alterations || null,
        academicNotation: settings.academicNotation,
    })

    return {
        ...settings,
        preset: settings,
        scale: {
            ...settings.scale,
            notes,
            notesSet,
            baseNaming: getPreferredNaming(baseScaleInfo),
            degreesInfo: getScaleDegreeInfo(
                type,
                notes,
                alteredScaleInfo?.alterations
            ),
            noteNameMap,
            containsAcademicNotation,
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
