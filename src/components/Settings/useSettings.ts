import { useContext } from 'react'
import { SettingsContext } from './Provider.tsx'

export const useSettings = () => {
    return useContext(SettingsContext)
}
