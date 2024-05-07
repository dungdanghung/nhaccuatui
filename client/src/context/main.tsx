import { ReactNode, createContext, useRef, useState } from 'react'
import { User } from '../models/user'
type AppContextType = ReturnType<typeof useAppContextValue>

const init: unknown = {}
export const AppContext = createContext<AppContextType>(init as AppContextType)

type song = {
    'id': number,
    "title": string,
    "artists": string,
    "audio": string,
    "image": string,
    "heart": number
}

function useAppContextValue() {
    const [permissions, setPermissions] = useState<string[]>([])
    const [user, setUser] = useState<User | undefined>()
    const [release_title, set_release_title] = useState<string | undefined>()
    const [formData, setFormData] = useState<FormData | undefined>()
    const [song, setSong] = useState<song>();
    const [playSong, setPlaySong] = useState<boolean>(false)
    return {
        music: {
            "get": song,
            "set": setSong,
            "setplay": setPlaySong,
            "play": playSong
        },
        // appLanguage: {
        //     language,
        //     setLanguage
        // },
        user: {
            user,
            setUser
        },
        song_create: {
            formData: formData,
            setFormData: setFormData
        },
        permissions: {
            items: permissions,
            setItems: setPermissions,
            // has: (name: string) => permissions.includes(name),
            // hasAnyFormList(permissionsToCheck: string[]) {
            //     return permissionsToCheck.some(permission => permissions.includes(permission))
            // }
        },
        release_title: {
            get: release_title,
            set: set_release_title
        }
    }
}

export function AppProvider({ children }: { children: ReactNode }) {
    const contextValue = useAppContextValue()
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}