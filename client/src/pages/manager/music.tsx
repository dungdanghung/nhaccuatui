import "./manager.css"
import { GetSongUpload } from "../../api/music"
import { useEffect, useState } from "react"
import { baseIMG } from "../../config/api";
import View_component from "./view_component";
import { useNavigate } from "react-router-dom";
import { SetStatusSong } from "../../api/music";

export default function Manager_music() {
    const [songs, setsongs] = useState([]);
    const [songselect, setsongselect] = useState();
    const navigator = useNavigate()
    const [songSetStatus, setsongSetStatus] = useState<number>();
    const [btnStatusElement, setbtnStatusElement] = useState<HTMLButtonElement>()

    function showactionoption(e: any) {
        if (e.target.className == "item") {
            console.log(e.target)
        }
        if (e.target.className == "action_btn") {
            const display = e.target.parentElement.children['1'] as HTMLDivElement
            const wrap = document.querySelector('.wrap_popup') as HTMLDivElement
            if (display.style.display == "none") {
                e.target.parentElement.children['1'].style.display = "block"
                display.classList.add('list_option_action')
                wrap.style.display = "block"
            } else {
                e.target.parentElement.children['1'].style.display = "none"
                display.classList.remove('list_option_action')
                wrap.style.display = "none"
            }
        }
    }

    function wrap_popup_click(e: any) {
        const list_option = document.querySelector('.list_option_action') as HTMLDivElement
        e.target.style.display = "none"
        list_option.style.display = "none"
    }

    useEffect(() => {
        if (songselect) {
            const list_option = document.querySelector('.list_option_action') as HTMLDivElement
            const wrap = document.querySelector('.wrap_popup') as HTMLDivElement
            list_option.style.display = "none"
            wrap.style.display = "none"
            navigator(`detail/${songselect['id']}`)
        }
    }, [songselect])


    function setStatus() {
        const a = document.querySelector('.status_list') as HTMLDivElement
        if (a.style.display == "none") {
            a.style.display = "block"
        } else {
            a.style.display = "none"
        }
    }
    function setStatusItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const a = document.querySelector('.input_status') as HTMLDivElement
        const b = e.target as HTMLButtonElement
        a.textContent = b.textContent
        setStatus()
    }

    function showFormSetStatus(prop: number) {
        return (e: any) => {
            setsongSetStatus(prop)
            const a = document.querySelector('.wrap_form_set_status') as HTMLDivElement
            a.style.display = "flex"
            setbtnStatusElement(e.target)
        }
    }
    function closeFormSetStatus(e: any) {
        if (e.target.className == "wrap_form_set_status") {
            const a = document.querySelector('.wrap_form_set_status') as HTMLDivElement
            const b = document.querySelector('.input_status') as HTMLDivElement
            a.style.display = "none"
            b.textContent = ''
        }
    }

    function saveSetStatus() {
        const a = document.querySelector('.input_status') as HTMLDivElement
        if (a.textContent) {
            SetStatusSong(songSetStatus, a.textContent)
                .then((rs) => {
                    const b = btnStatusElement as HTMLButtonElement
                    b.textContent = rs.status
                    b.className = `status_${rs.status.toLowerCase()}`
                    const a = document.querySelector('.wrap_form_set_status') as HTMLDivElement
                    a.click()
                })
        }
    }

    useEffect(() => {
        GetSongUpload()
            .then((rs: any) => {
                setsongs(rs);
            })
    }, [])

    return (
        <div>
            <div className="zm-box zm-mainpage">
                <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: "100%" }}>
                    <main className="zm-section" id="body-scroll">
                        <div className="container zm-my-music">
                            <div className="container mymusic-overivew">
                                <div style={{ position: "relative" }}>
                                    <div className="header">
                                        <div className="text">
                                            Quản lý bài hát</div><button className="zm-btn button">
                                            <i className="icon">
                                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                                                    <g filter="url(#filter0_d_3141_46346)">
                                                        <circle cx="22" cy="21" r="18" fill="#FEFFFF">
                                                        </circle></g>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z" fill="#141414">
                                                    </path>
                                                    <defs><filter id="filter0_d_3141_46346" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix">
                                                        </feFlood>
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha">
                                                        </feColorMatrix>
                                                        <feOffset dy="1">
                                                        </feOffset>
                                                        <feGaussianBlur stdDeviation="2">
                                                        </feGaussianBlur>
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0">
                                                        </feColorMatrix>
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3141_46346">
                                                        </feBlend>
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3141_46346" result="shape">
                                                        </feBlend>
                                                    </filter>
                                                    </defs>
                                                </svg>
                                            </i>
                                        </button>
                                    </div>
                                    <div className="bottom-section">
                                        <nav className="zm-navbar mar-t-30 zm-navbar-wrap">
                                            <div className="zm-narbar-container">
                                                <ul className="zm-navbar-menu">
                                                    <li className="zm-navbar-item is-active">
                                                        <div className="navbar-link">
                                                            <a className="" href="/mymusic/song">
                                                                BÀI HÁT</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                        <div><div className="zm-nav-buttons mar-b-20">
                                            <a className="item active" href="/mymusic/song/favorite">
                                                Yêu thích</a>
                                            <a className="item" href="/mymusic/song/upload">
                                                Đã tải lên</a>
                                        </div>
                                            <div className="zm-library-song">
                                                <div className="list list-border song-list-select">
                                                    <div className="media select-header">
                                                        <div className="media-left">
                                                            <div className="sort-wrapper">
                                                                <div className="zm-dropdown zm-group-dropdown mar-r-10 is-hidden">

                                                                    <div className="zm-dropdown-content">
                                                                        <div className="zm-dropdown-list-item">
                                                                            Mặc định</div>
                                                                        <div className="zm-dropdown-list-item">
                                                                            Tên bài hát (A-Z)</div>
                                                                        <div className="zm-dropdown-list-item">
                                                                            Tên ca sĩ (A-Z)</div>
                                                                        <div className="zm-dropdown-list-item">
                                                                            Tên Album (A-Z)</div>
                                                                    </div>
                                                                </div>
                                                                <div className="column-text">
                                                                    Bài hát</div>
                                                            </div>
                                                        </div>
                                                        <div className="media-center">
                                                            <div className="column-text">
                                                                status</div>
                                                        </div>
                                                        <div className="media-right">
                                                            <div className="column-text">
                                                                action</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {
                                                            songs.map(($item) => {
                                                                return (
                                                                    <div key={$item['id']} className="select-item" style={{ marginBottom: '13px' }}>
                                                                        <div className="list-item bor-b-1 media-item hide-right active">
                                                                            <div className="media" style={{ backgroundColor: "transparent" }}>
                                                                                <div className="media-left">
                                                                                    <div className="song-prefix mar-r-10">
                                                                                        <i className="icon ic-song">
                                                                                        </i>
                                                                                    </div>
                                                                                    <div className="song-thumb">
                                                                                        <figure className="image is-40x40" title="y2mate.com - Maroon 5  Maps Lyric Video">
                                                                                            <img src={`${baseIMG}uploads/image/168x94/${$item['image']}`} alt="" />
                                                                                        </figure>

                                                                                    </div>
                                                                                    <div className="card-info">
                                                                                        <div className="title-wrapper">
                                                                                            <div className="title item-title has-icon">
                                                                                                <span>
                                                                                                    <span>
                                                                                                        <span className="text">{$item['title']}</span>
                                                                                                    </span>
                                                                                                </span>
                                                                                                <i className="icon ic-private" title="Bài hát riêng tư">
                                                                                                </i>
                                                                                            </div>
                                                                                        </div>
                                                                                        <h3 className="is-one-line is-truncate subtitle">
                                                                                            <span className="artist-names">
                                                                                                <span>{JSON.parse($item['artists']).join(' - ')}</span>
                                                                                            </span>
                                                                                        </h3>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="media-center" onClick={showFormSetStatus($item['id'])}>
                                                                                    {
                                                                                        $item['status'] == "pending" ? <button className="status_pending">Pending</button> :
                                                                                            $item['status'] == "accept" ? <button className="status_approved">Approved</button> :
                                                                                                <button className="status_cancelled">Cancelled</button>
                                                                                    }
                                                                                </div>
                                                                                <div className="media-right" style={{ backgroundColor: "transparent" }} onClick={showactionoption}>
                                                                                    <button className="action_btn" style={{ backgroundColor: "hsla(0, 0%, 100%, 0.3)" }}>action</button>
                                                                                    <div className="list_option" style={{ display: "none" }}>
                                                                                        <div className="item" onClick={() => { setsongselect($item) }}>View</div>
                                                                                        <div className="item">Delete</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                    <div className="track-horizontal">
                        <div>
                        </div>
                    </div>
                    <div className="track-vertical">
                        <div className="thumb-vertical">
                        </div>
                    </div>
                </div>
            </div >
            <div onClick={wrap_popup_click} className="wrap_popup"></div>
            <View_component data={songselect} />
            <div className="wrap_form_set_status" onClick={closeFormSetStatus} style={{ display: "none" }}>
                <div className="form_set_status">
                    <div className="form_set_status_header">
                        <div className="header">Set status</div>
                    </div>
                    <div className="form_set_status_container">
                        <div className="wrap_input_status">
                            <div className="input_status" onClick={setStatus}></div>
                            <div className="status_list" style={{ display: "none" }}>
                                <div className="wrap" onClick={setStatusItem}>
                                    <button className="status_item">Pending</button>
                                    <button className="status_item">Approved</button>
                                    <button className="status_item">Cancelled</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form_set_status_footer">
                        <div className="wrap_footer">
                            <button onClick={saveSetStatus}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
