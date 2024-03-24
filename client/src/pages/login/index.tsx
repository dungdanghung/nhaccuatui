import style from "./login.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Login as api_login } from "../../api/auth"
import { GetUser } from "../../api/user"
import { useAppContext } from "../../context"

function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const { user } = useAppContext()

    function HandleLogin() {
        api_login(username, password)
            .then((rs) => {
                if (rs) {
                    GetUser()
                        .then((rs) => {
                            if (rs) {
                                user.setUser(rs.user)
                                navigate('/')
                            }
                        })
                }
            })
    }

    return (
        <div className={style['login']}>
            <div className={style["container"]}>
                <div className={style["text"]}>
                    Login Form
                </div>
                <div className={style["wrap-container"]}>
                    <div className={style["data"]}>
                        <label className={style["label"]}>UserName</label>
                        <input className={style["input"]} type="text" value={username} required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div className={style["data"]}>
                        <label className={style["label"]}>Password</label>
                        <input className={style["input"]} type="password" value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div className={style["forgot-pass"]}>
                        <a className={style["a"]} href="#">Forgot Password?</a>
                    </div>
                    <div className={style["btn"]}>
                        <div className={style["inner"]}>
                        </div>
                        <button className={style["button"]} onClick={HandleLogin} >Login</button>
                    </div>
                    <div className={style["signup-link"]}>
                        Not a member? <a className={style["a"]} href="/auth/register">sign up now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login