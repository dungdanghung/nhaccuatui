import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Register as api_register } from "../../api/auth"
import style from "./register.module.css"


export default function Register() {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [username, setusername] = useState('')
    const [emailorphone, setemailorphone] = useState('')
    const [password, setpassword] = useState('')
    const [gender, setgender] = useState('male')
    const [birth, setbirth] = useState('')

    const navigate = useNavigate();

    function HandleRegister() {
        let check = true
        const clearElements = document.querySelectorAll(`.${style['wrap_label']}`)
        clearElements.forEach((element: any) => {
            element.children[1].textContent = ''
        });
        const Elements = document.querySelectorAll(`.${style['data']}`)
        Elements.forEach((element: any) => {
            if (!element.children[1].value || element.children[1].value.trim() == '') {
                element.children[0].children[1].textContent = 'field không được để trống'
                check = false
            } else if (element.children[0].children[0].textContent === "Email or Phone") {
                let value = element.children[1].value
                let checkEmailOrPhone = Array.from(value).every((item: any) => {
                    if (parseInt(item) || parseInt(item) === 0) return true
                    else return false
                })

                if (!checkEmailOrPhone && !value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    element.children[0].children[1].textContent = 'dữ liệu không hợp lệ'
                    check = false
                }
                if (checkEmailOrPhone && (value.length < 10 || value.length > 11)) {
                    element.children[0].children[1].textContent = 'dữ liệu không hợp lệ'
                    check = false

                }
            } else if (element.children[0].children[0].textContent === "Password") {
                let value = element.children[1].value
                const checkPassword = Array.from(value).every((item: any) => {
                    if (!isNaN(parseInt(item))) return true
                    return false
                })
                if (!checkPassword || value.length < 6) {
                    element.children[0].children[1].textContent = 'Mật khẩu phải từ 6 ký tự'
                    check = false
                }
            }
        });

        if (check) {
            const data = {
                firstName: firstname,
                lastName: lastname,
                userName: username,
                emailorphone: emailorphone,
                gender: gender,
                birth: birth,
                password: password
            } as any;
            api_register(data)
                .then((rs) => {
                    if (rs as any) navigate('/auth/login')
                })

        }
    }



    return (
        <div className={style["signup"]}>
            <div className={style["container"]}>
                <div className={style["text"]}>
                    Signup Form
                </div>
                <div className={style["wrap-container"]}>
                    <div className={style["data"]}>
                        <div className={style['wrap_label']}>
                            <label className={style['label_item']}>First Name</label>
                            <label className={style['label_item']}></label>
                        </div>
                        <input className={style['input']} type="text" value={firstname} required onChange={(e) => { setfirstname(e.target.value) }} />
                    </div>
                    <div className={style["data"]}>
                        <div className={style['wrap_label']}>
                            <label className={style['label_item']}>Last Name</label>
                            <label className={style['label_item']}></label>
                        </div>
                        <input className={style['input']} type="text" value={lastname} required onChange={(e) => { setlastname(e.target.value) }} />
                    </div>
                    <div className={style["data"]}>
                        <div className={style['wrap_label']}>
                            <label className={style['label_item']}>UserName</label>
                            <label className={style['label_item']}></label>
                        </div>
                        <input className={style['input']} type="text" value={username} required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div className={style["data"]}>
                        <div className={style['wrap_label']}>
                            <label className={style['label_item']}>Birth</label>
                            <label className={style['label_item']}></label>
                        </div>
                        <input className={style['input']} type="date" required onChange={(e) => { setbirth(e.target.value) }} />
                    </div>
                    <div className={[style['gender']].join(' ')}>
                        <label className={style['name_gender']}>Gender</label>
                        <div className={style["wrap-gender"]}>
                            <div className={style["gender-item"]}>
                                <span className={style['name_gender']}>Male</span>
                                <input className={style['input']} name="gender" type="radio" checked={true} onClick={() => { setgender("male") }} />
                            </div>
                            <div className={style["gender-item"]}>
                                <span className={style['name_gender']}>Female</span>
                                <input className={style['input']} name="gender" type="radio" onClick={() => { setgender("female") }} />
                            </div>
                        </div>
                    </div>
                    <div className={style["data"]}>
                        <div className={style['wrap_label']}>
                            <label className={style['label_item']}>Email or Phone</label>
                            <label className={style['label_item']}></label>
                        </div>
                        <input className={style['input']} type="text" value={emailorphone} required onChange={(e) => { setemailorphone(e.target.value) }} />
                    </div>
                    <div className={style["data"]}>
                        <div className={style['wrap_label']}>
                            <label className={style['label_item']}>Password</label>
                            <label className={style['label_item']}></label>
                        </div>
                        <input className={style['input']} type="password" value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div className={style["forgot-pass"]}>
                        <a className={style["forgot_pass"]} href="#">Forgot Password?</a>
                    </div>
                    <div className={style["btn"]}>
                        <div className={style["inner"]}></div>
                        <button className={style['btn_register']} onClick={HandleRegister} >register</button>
                    </div>
                    <div className={style["signup-link"]}>
                        Not a member? <a className={style['signup_link']} href="/auth/login">Login now</a>
                    </div>
                </div>
            </div>
        </div >
    )
}
