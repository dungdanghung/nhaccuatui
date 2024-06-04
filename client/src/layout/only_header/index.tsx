import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useAppContext } from "../../context"
import { GetUser } from "../../api/user"
import Header from "../../components/header"
import "./only_header.css"

export default function LayoutOnlyHearder() {
    const { user } = useAppContext()
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        GetUser()
            .then(rs => {
                user.setUser(rs.user)
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
        <div className='wrap-layout'>
            <Header type_header="only_heard" />
            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}



