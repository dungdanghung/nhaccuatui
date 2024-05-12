import { useEffect, useState } from "react"
import "./profile.css"
import { GetUser } from "../../api/user"
import { baseIMG } from "../../config/api"
import Header from "../../components/header"

import Profile_Item from "./profile_item"
import Form_uploadsong from "./form_upload"
import { useAppContext } from "../../context"
import { useNavigate } from "react-router-dom"

function Profile() {

    const [datacontent, setdatacontent] = useState([])
    const [popupuploadsong, setpopupuploadsong] = useState("off")


    const { user, permissions } = useAppContext()
    const navigate = useNavigate()

    function popupfileupload() {
        setpopupuploadsong("on")
    }
    function closepopupfileupload() {
        setpopupuploadsong("off")
    }

    useEffect(() => {
        GetUser()
            .then(rs => {
                user.setUser(rs.user)
                permissions.setItems(rs.permissions)
                document.querySelector('.pre-load-container')?.classList.add('hide')
            })
            .catch(() => {
                navigate('/auth/login')
            })
    }, [])

    if (user) {
        return (
            <div className="profilepage">
                <div className="wrapprofile">
                    <Header type_header="only_heard" />
                    <div className="contentuser">
                        <div className="wrapcontentuser">
                            <div className="backgroundavatar">
                                {
                                    user.user?.background_image ?
                                        <img /> :
                                        <></>
                                }
                                <img />
                                <div className="wrapbtnfuntion">
                                    <div className="btnfuntion">
                                        <span>Tạo Mới Avatar</span>
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                    <div className="btnfuntion">
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
                                        <div className="updateinfor">
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
                                        <div>content</div>
                                        :
                                        <></>
                                }
                                <Profile_Item data={user.user} itembirthday={true} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}



export default Profile