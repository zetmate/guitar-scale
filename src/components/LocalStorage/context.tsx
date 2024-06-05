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
    hasSeenThePopup?: boolean
    updateTheme: (value?: ThemeMode) => void
    updateSettings: (settings: Settings) => void
    setHasSeenThePopup: () => void
}

const THEME_KEY = 'theme'
const SETTINGS_KEY = 'settings'
const POPUP_KEY = 'mobile_device_warning'

const LocalStorageContext = React.createContext<LocalStorage>({
    updateTheme: () => {},
    updateSettings: () => {},
    setHasSeenThePopup: () => {},
})

export const useLocalStorage = () => {
    return useContext(LocalStorageContext)
}

export const LocalStorageProvider = ({ children }: PropsWithChildren) => {
    const [isReady, setIsReady] = useState<boolean>(false)
    const [settings, setSettings] = useState<Settings | undefined>()
    const [theme, setTheme] = useState<ThemeMode | undefined>()
    const [hasSeenThePopup, setHasSeenThePopup] = useState<boolean>()

    useEffect(() => {
        if (!isReady) {
            // get the theme
            const savedTheme =
                (localStorage.getItem(THEME_KEY) as ThemeMode) || undefined
            savedTheme && setTheme(JSON.parse(savedTheme))

            // get the settings
            const settingsRaw = localStorage.getItem(SETTINGS_KEY)
            settingsRaw && setSettings(JSON.parse(settingsRaw))

            // get the popup warning
            const hasSeen = localStorage.getItem(POPUP_KEY)
            setHasSeenThePopup(!!hasSeen)

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

    const updateHasSeenValue = useCallback(() => {
        localStorage.setItem(POPUP_KEY, 'true')
    }, [])

    const value = useMemo(
        () => ({
            theme,
            settings,
            updateSettings,
            updateTheme,
            hasSeenThePopup,
            setHasSeenThePopup: updateHasSeenValue,
        }),
        [theme, settings, updateSettings, updateTheme, updateHasSeenValue]
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
