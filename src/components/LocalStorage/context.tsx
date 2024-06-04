import React, {
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { ThemeMode } from '../../common/types.ts'
import { Settings } from '../Settings/Provider.tsx'
import { PuffLoader } from 'react-spinners'

interface LocalStorage {
    theme?: ThemeMode
    settings?: Settings
    updateTheme: (value?: ThemeMode) => void
    updateSettings: (settings: Settings) => void
}

const THEME_KEY = 'theme'
const SETTINGS_KEY = 'settings'

const LocalStorageContext = React.createContext<LocalStorage>({
    updateTheme: () => {},
    updateSettings: () => {},
})

export const useLocalStorage = () => {
    return useContext(LocalStorageContext)
}

export const LocalStorageProvider = ({ children }: PropsWithChildren) => {
    const [isReady, setIsReady] = useState<boolean>(false)
    const [settings, setSettings] = useState<Settings | undefined>()
    const [theme, setTheme] = useState<ThemeMode | undefined>()

    useEffect(() => {
        if (!isReady) {
            const savedTheme =
                (localStorage.getItem(THEME_KEY) as ThemeMode) || undefined
            savedTheme && setTheme(JSON.parse(savedTheme))
            const settingsRaw = localStorage.getItem(SETTINGS_KEY)
            settingsRaw && setSettings(JSON.parse(settingsRaw))

            setIsReady(true)
        }
    }, [isReady])

    const updateSettings = useCallback((newSettings: Settings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
    }, [])

    const updateTheme = useCallback((newTheme?: ThemeMode) => {
        if (newTheme) {
            localStorage.setItem(THEME_KEY, JSON.stringify(newTheme))
        } else {
            localStorage.removeItem(THEME_KEY)
        }
    }, [])

    const value = useMemo(
        () => ({
            theme,
            settings,
            updateSettings,
            updateTheme,
        }),
        [theme, settings, updateSettings, updateTheme]
    )

    if (!isReady || !value) {
        return <PuffLoader />
    }
    return (
        <LocalStorageContext.Provider value={value}>
            {children}
        </LocalStorageContext.Provider>
    )
}
