import "./header.css"
import { baseIMG } from "../../config/api"
import { useAppContext } from "../../context";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"

export default function Header({ type_header = "full" }) {
    const { user, release_title } = useAppContext();
    const navigator = useNavigate();
    useEffect(() => {
        tippy('.header__upload', {
            content: 'Phát hành bài hát',
            theme: 'tooltip'
        });
    }, [])

    function popup_upload(e: any) {
        if (e.target.className.includes("fa-upload")) {
            var a = document.querySelector(".header__upload-popup") as HTMLElement
            a.style.display = "flex"
        } else {
            var a = document.querySelector(".header__upload-popup") as HTMLElement
            a.style.display = "none"
        }
    }

    function uploadConfirm() {
        const title = document.querySelector('.title-song') as HTMLInputElement
        release_title.set(title.value);
        navigator('/create')
    }


    return (
        <div className="header-wrapper">
            <div className="header">
                {
                    type_header == "only_heard" ? <Link to={'/'} className="header__logo"></Link> : <></>
                }
                {
                    type_header == "full" ?
                        <>
                            <div className="header__undo mobile-hiden js__sub-color">
                                <i className="fas fa-arrow-left hover js__toast"></i>
                                <i className="fas fa-arrow-right hover js__toast header__undo--disble"></i>
                            </div>
                            <div className="header__width-search js__backgroundColor">
                                <i className="fas fa-search header__width-search-icon js__sub-color"></i>

                                <input placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV . . ." type="text" className="header__width-search-input" />

                                <div className="header__width-search-sub">
                                    <span className="header__width-search-sub-header js__main-color">Đề xuất cho bạn</span>
                                    <ul className="header__width-search-sub-list ">
                                        <li className="header__width-search-sub-item">
                                            <a href="#" className="header__width-search-sub-item-link">
                                                <i className="fas fa-arrows-alt-h js__sub-color"></i>
                                                <span className="js__sub-color">là ai</span>
                                            </a>
                                        </li>
                                        <li className="header__width-search-sub-item">
                                            <a href="#" className="header__width-search-sub-item-link">
                                                <i className="fas fa-arrows-alt-h js__sub-color"></i>
                                                <span className="js__sub-color">adele</span>
                                            </a>
                                        </li>
                                        <li className="header__width-search-sub-item">
                                            <a href="#" className="header__width-search-sub-item-link">
                                                <i className="fas fa-arrows-alt-h js__sub-color"></i>
                                                <span className="js__sub-color">chung tình</span>
                                            </a>
                                        </li>
                                        <li className="header__width-search-sub-item">
                                            <a href="#" className="header__width-search-sub-item-link">
                                                <i className="fas fa-arrows-alt-h js__sub-color"></i>
                                                <span className="js__sub-color">zing choice</span>
                                            </a>
                                        </li>
                                        <li className="header__width-search-sub-item">
                                            <a href="#" className="header__width-search-sub-item-link">
                                                <i className="fas fa-arrows-alt-h js__sub-color"></i>
                                                <span className="js__sub-color">#zingchart</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </> : <></>
                }
                {
                    type_header == "manager" ? <div className="btn_manager_sidebar">
                        <i className="fas fa-align-justify"></i>
                    </div> : <></>
                }
                <div className="header__right">
                    <div className="header__theme js__sub-color js__backgroundColor">
                        <i className="fas fa-tshirt"></i>
                    </div>
                    <div className="header__upload mobile-hiden js__sub-color js__toast js__backgroundColor hover" onClick={popup_upload}>
                        <i className="fas fa-upload"></i>
                    </div>
                    <div className="header__upload-popup" >
                        <div className="confirm">
                            <h1>Release title</h1>
                            <div className="wrap-title">
                                <input className="title-song" type="text" />
                            </div>
                            <button className="Cancel" onClick={popup_upload}>Cancel</button>
                            <button className="Confirm" onClick={uploadConfirm}>Confirm</button>
                        </div>
                    </div>

                    <div className="header__setting mobile-hiden js__sub-color js__backgroundColor">
                        <i className="fas fa-cog header__setting-icon"></i>
                        <ul className="header__setting-list">
                            <li className="header__setting-item">
                                <i className="fas fa-ban"></i>
                                Danh sách chặn
                            </li>
                            <li className="header__setting-item">
                                <i className="far fa-play-circle"></i>
                                Chất lượng nhạc
                            </li>
                            <li className="header__setting-item">
                                <i className="fas fa-external-link-square-alt"></i>
                                Trình phát nhạc
                            </li>
                            <span className="header__setting-line"></span>
                            <li className="header__setting-item">
                                <i className="fas fa-info-circle"></i>
                                Giới thiệu
                            </li>
                            <li className="header__setting-item">
                                <i className="far fa-flag"></i>
                                Góp ý
                            </li>
                            <li className="header__setting-item">
                                <i className="fas fa-phone-alt"></i>
                                Liên hệ
                            </li>
                            <li className="header__setting-item">
                                <i className="fab fa-adversal"></i>
                                Quảng cáo
                            </li>
                            <li className="header__setting-item">
                                <i className="fas fa-notes-medical"></i>
                                Thoả thuận sử dụng
                            </li>
                            <li className="header__setting-item">
                                <i className="fas fa-shield-alt"></i>
                                Chính sách bảo mật
                            </li>
                        </ul>
                    </div>

                    <Link to={'/profile'} className="header__upload wrap-avatar">
                        <img src={`${baseIMG}img/avatar/${user.user?.avatar}`} alt="user" className="header__user-img" />
                    </Link>
                </div>
            </div>
        </div>

    )
}




