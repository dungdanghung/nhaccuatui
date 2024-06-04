import { useEffect, useState } from "react"
import "./profile.css"
import { GetUser } from "../../api/user"
import { baseIMG } from "../../config/api"
import Change_avatar_modal from "./change_avatar_modal"
import Profile_Item from "./profile_item"
import Form_uploadsong from "./form_upload"
import { useAppContext } from "../../context"
import { useNavigate } from "react-router-dom"
import Change_background_modal from "./change_background_modal"
import { GetPosts } from "../../api/post"
import Show_all_comment from "./show_all_comment"
import Edit_profile from "./edit_profile"

function Profile() {

    const [datacontent, setdatacontent] = useState([])
    const [popupuploadsong, setpopupuploadsong] = useState("off")
    const [modal_edit_profile, set_modal_edit_profile] = useState("off")

    const { user } = useAppContext()
    const navigate = useNavigate()

    function popupfileupload() {
        setpopupuploadsong("on")
    }
    function modalEditProfile() {
        set_modal_edit_profile("on")
    }
    function closepopupfileupload() {
        setpopupuploadsong("off")
    }

    function change_avatar() {
        const avatar = document.querySelector('.avatar_file') as HTMLInputElement
        if (avatar) {
            avatar.click();
        }
    }

    function avatar_input() {
        const avatar = document.querySelector('.avatar_file') as HTMLInputElement
        const image_background = document.getElementById('image_background_display') as HTMLImageElement
        const image_select = document.getElementById('image_select_display') as HTMLImageElement

        const change_avatar_modal = document.querySelector('.change_avatar_modal') as HTMLDivElement
        if (avatar) {
            const files = avatar.files as FileList
            if (files[0]) {
                image_background.src = URL.createObjectURL(files[0])
                image_select.src = URL.createObjectURL(files[0])
            }
            change_avatar_modal.style.display = "flex"
        }
    }

    function change_background() {
        const background = document.querySelector('.background_file') as HTMLInputElement
        if (background) {
            background.click();
        }
    }
    function background_input() {
        const background = document.querySelector('.background_file') as HTMLInputElement
        const image_background = document.querySelector('.change_background_form #image_background_display') as HTMLImageElement
        const image_select = document.querySelector('.change_background_form #image_select_display') as HTMLImageElement

        const change_background_modal = document.querySelector('.change_background_modal') as HTMLDivElement
        if (background) {
            const files = background.files as FileList
            if (files[0]) {
                image_background.src = URL.createObjectURL(files[0])
                image_select.src = URL.createObjectURL(files[0])
            }
            change_background_modal.style.display = "flex"
        }
    }

    function close_modal(e: any) {
        const element = e.target as HTMLDivElement
        if (element.className.includes('modal')) {
            element.style.display = 'none'
        }
        const input = document.querySelector('.avatar_file') as HTMLInputElement
        input.value = ''
    }

    useEffect(() => {
        GetUser()
            .then(rs => {
                user.setUser(rs.user)
                document.querySelector('.pre-load-container')?.classList.add('hide')
            })
            .catch(() => {
                navigate('/auth/login')
            })
        GetPosts()
            .then((rs) => {
                setdatacontent(rs)
            })
    }, [])

    if (user) {
        return (
            <div className="profilepage">
                <div className="wrapprofile">

                    <div className="contentuser">
                        <div className="wrapcontentuser">
                            <div className="backgroundavatar">
                                {
                                    user.user?.background_image ?
                                        <img src={`${baseIMG}img/background/${user.user?.background_image}`} />
                                        :
                                        <></>
                                }

                                <div className="wrapbtnfuntion">
                                    <div className="btnfuntion" onClick={change_avatar}>
                                        <span>Tạo Mới Avatar</span>
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                    <div className="btnfuntion" onClick={change_background}>
                                        <span>Chỉnh Sửa Ảnh Bìa</span>
                                        <i className="fas fa-camera-retro"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="user">
                                <div className="avatar">
                                    <img src={`${baseIMG}img/avatar/${user.user?.avatar}`} />
                                </div>
                                <div className="detail">
                                    <div className="username">
                                        {user.user?.user_name}
                                    </div>
                                    <div className="follow">
                                        <div className="followitem">
                                            0 Follower
                                        </div>
                                        <span />
                                        <div className="followitem">
                                            0 Đang Theo Dõi
                                        </div>
                                    </div>
                                </div>
                                <div className="functionofuser">
                                    <div className="wrapbtnfunction">
                                        <div className="updateinfor" onClick={modalEditProfile}>
                                            <span>Chỉnh Sửa Trang Cá Nhân</span>
                                            <i className="fas fa-pencil-alt"></i>
                                        </div>
                                        <div className="addnew" onClick={popupfileupload}>
                                            <span>Thêm Mới</span>
                                            <i className="fas fa-plus"></i>
                                        </div>
                                    </div>
                                    <div className="btnsuggetfollew">
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            popupuploadsong === "off" ?
                                <></> :
                                <Form_uploadsong closepopup={closepopupfileupload} />
                        }

                    </div>
                    <div className="profilecontent">
                        <div className="wrapcontent">
                            <div className="sidebarcontent">
                                <div className="introduce">
                                    <label>Giới thiệu</label>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                                <div className="music">
                                    <label>Nhạc</label>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                                <div className="frend">
                                    <label>Bạn bè</label>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                            </div>
                            <div className="containcontent">
                                {
                                    datacontent.length !== 0 ?
                                        datacontent.map((item) => {
                                            return (
                                                <div key={item['id']}>
                                                    <Profile_Item data={item} />
                                                </div>
                                            )
                                        })
                                        :
                                        <></>
                                }
                                {
                                    user.user ?
                                        <Profile_Item data={user.user} itembirthday={true} /> :
                                        <></>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <div className="change_avatar_modal" style={{ display: 'none' }} onClick={close_modal}>
                    <Change_avatar_modal />
                    <input type="file" className="avatar_file" hidden onChange={avatar_input} />
                </div>
                <div className="change_background_modal" style={{ display: 'none' }} onClick={close_modal}>
                    <Change_background_modal />
                    <input type="file" className="background_file" hidden onChange={background_input} />
                </div>
                <div className="show_all_comment modal" onClick={close_modal}>
                    <Show_all_comment />
                </div>
                {
                    modal_edit_profile == "off" ? <></> :
                        <div className="edit_profile_modal" onClick={(e) => {
                            const a = e.target as HTMLDivElement
                            if (a.className == "edit_profile_modal") {
                                set_modal_edit_profile('off')
                            }
                        }}>
                            <Edit_profile />
                        </div>
                }
            </div >
        )
    }
}



export default Profile