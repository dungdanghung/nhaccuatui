import style from "../register/register.module.css"
import { useEffect, useState } from "react"
import { useAppContext } from "../../context"
import { updateProfile } from "../../api/user"

export default function Edit_profile() {
    const { user } = useAppContext()
    const [firstname, setfirstname] = useState(user.user?.first_name ? user.user?.first_name : '')
    const [lastname, setlastname] = useState(user.user?.last_name ? user.user?.last_name : '')
    const [username, setusername] = useState(user.user?.user_name ? user.user?.user_name : '')
    const [emailorphone, setemailorphone] = useState(user.user?.phone_number ? user.user?.phone_number : user.user?.email ? user.user.email : '')
    const [gender, setgender] = useState(user.user?.gender)
    const [birth, setbirth] = useState(new Date(user.user?.birth_day ? user.user?.birth_day : '').toLocaleDateString('zh-Hans-CN'))

    useEffect(() => {
        const element = document.querySelector('input[type="date"]') as HTMLInputElement
        var d = new Date(user.user?.birth_day ? user.user?.birth_day : '');
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();
        element.value = `${yy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`
    }, [])

    function update() {
        const data = new FormData
        data.append('first_name', firstname)
        data.append('last_name', lastname)
        data.append('user_name', username)
        data.append('birth_day', birth)
        data.append('gender', gender ? gender : '')
        data.append('emailorphone', emailorphone)
        updateProfile(data)
            .then((rs) => {
                if (rs) window.location.reload()
            })
    }

    if (user.user) {
        return (
            <div className="edit_profile_form">
                <div className={style["container"]}>
                    <div className={style["wrap-container"]}>
                        <div className={style["data"]}>
                            <div className={style['wrap_label']}>
                                <label className={style['label_item']}>First Name</label>
                                <label className={style['label_item']}></label>
                            </div>
                            <input className={style['input']} type="text" required onChange={(e) => { setfirstname(e.target.value) }} defaultValue={firstname} />
                        </div>
                        <div className={style["data"]}>
                            <div className={style['wrap_label']}>
                                <label className={style['label_item']}>Last Name</label>
                                <label className={style['label_item']}></label>
                            </div>
                            <input className={style['input']} type="text" required onChange={(e) => { setlastname(e.target.value) }} defaultValue={lastname} />
                        </div>
                        <div className={style["data"]}>
                            <div className={style['wrap_label']}>
                                <label className={style['label_item']}>UserName</label>
                                <label className={style['label_item']}></label>
                            </div>
                            <input className={style['input']} type="text" required onChange={(e) => { setusername(e.target.value) }} defaultValue={username} />
                        </div>
                        <div className={style["data"]}>
                            <div className={style['wrap_label']}>
                                <label className={style['label_item']}>Birth</label>
                                <label className={style['label_item']}></label>
                            </div>
                            <input className={style['input']} type="date" required onChange={(e) => { setbirth(e.target.value) }} defaultValue={birth} />
                        </div>
                        <div className={[style['gender']].join(' ')}>
                            <label className={style['name_gender']}>Gender</label>
                            <div className={style["wrap-gender"]}>
                                <div className={style["gender-item"]}>
                                    <span className={style['name_gender']}>Male</span>
                                    <input className={style['input']} name="gender" type="radio" defaultChecked={gender == "male" ? true : false} onClick={() => { setgender("male") }} />
                                </div>
                                <div className={style["gender-item"]}>
                                    <span className={style['name_gender']}>Female</span>
                                    <input className={style['input']} name="gender" type="radio" defaultChecked={gender == "male" ? false : true} onClick={() => { setgender("female") }} />
                                </div>
                            </div>
                        </div>
                        <div className={style["data"]}>
                            <div className={style['wrap_label']}>
                                <label className={style['label_item']}>Email or Phone</label>
                                <label className={style['label_item']}></label>
                            </div>
                            <input className={style['input']} type="text" defaultValue={emailorphone} required onChange={(e) => { setemailorphone(e.target.value) }} />
                        </div>
                        <div className={style["btn"]}>
                            <div className={style["inner"]}></div>
                            <button className={style['btn_register']} onClick={update} >Update</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
