import { ReactNode, createContext, useRef, useState } from 'react'
import { User } from '../models/user'
type AppContextType = ReturnType<typeof useAppContextValue>

const init: unknown = {}
export const AppContext = createContext<AppContextType>(init as AppContextType)

type song = {
    'id': number | undefined,
    "title": string | undefined,
    "artists": string | undefined,
    "audio": string | undefined,
    "image": string | undefined,
    "heart": number | undefined
    'lyric_file': string | undefined
    'composition_copyright': string | undefined
    "check_heart": boolean,
    "originaly_released": string | undefined
    "check_playlist": boolean,
}

export type mv = {
    'id': number | undefined,
    "title": string | undefined,
    "mv": string,
    "image": string | undefined,
    "heart": number | undefined
    'lyric_file': string | undefined
    'composition_copyright': string | undefined
    "artists": string | undefined,
    "check_heart": boolean,
    "originaly_released": string | undefined
    "check_playlist": boolean | undefined,
}

export type post = {
    "id": number,
    "media": string | undefined,
    "image": string | undefined,
    "text_content": string | undefined,
    "create_time": string,
    "avatar": string,
    "user_name": string,
    "heart": number,
    "count_of_share": number,
    "count_of_comment": number,
    "check_heart": boolean,
}

function useAppContextValue() {
    const [user, setUser] = useState<User | undefined>()
    const [release_title, set_release_title] = useState<string | undefined>()
    const [formData, setFormData] = useState<FormData | undefined>()
    const [media, set_media] = useState<mv | song>();
    const [play, setPlay] = useState<boolean>(false)
    const [post, setPost] = useState<post>({} as post)
    const [comment, setComment] = useState([])
    const [lyric_active, setLyric_active] = useState<number | null>()
    return {
        media: {
            "get": media,
            "set": set_media,
            "setplay": setPlay,
            "play": play
        },
        post: {
            'get': post,
            'set': setPost,
            'comment': comment,
            'setComment': setComment
        },
        user: {
            user,
            setUser
        },
        song_create: {
            formData: formData,
            setFormData: setFormData
        },
        mv_create: {
            formData: formData,
            setFormData: setFormData
        },
        lyric_active: {
            get: lyric_active,
            set: setLyric_active
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