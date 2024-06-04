import style from "./layout_dashboard.module.css"
import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useAppContext } from "../../context"
import { GetUser } from "../../api/user"
import Header from "../../components/header"
import Sidebar from "../../components/sidebar"
import MusicController from "../../components/musicController"
import PlayList from "../../components/playList"

export default function LayoutDashBoard() {
    const { user } = useAppContext()
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        GetUser()
            .then(rs => {
                user.setUser(rs.user)
                // permissions.setItems(rs.permissions)
                setChecking(false)
                document.querySelector('.pre-load-container')?.classList.add('hide')
            })
            .catch(() => {
                setChecking(false)
                navigate('/auth/login')
            })
    }, [])
    if (checking) return null
    return (
        <div className={style['dashboard-layout']}>
            <div className={style['wrap_layout']}>
                <Sidebar />
                <div className={style['dashboard-content']}>
                    <Header type_header="full" />
                    <Outlet />
                </div>
                <PlayList />
            </div>
            <div>
                <MusicController />
            </div>
        </div>
    )
}



