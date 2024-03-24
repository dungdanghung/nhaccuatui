import style from "./sidebar.module.css"
import "../../assets/fontawesome-free-5.15.4-web/css/all.css"

export default function Sidebar() {
    return (
        <>
            <div className={[style["main-sidebar"], style["mobile-hiden"]].join(' ')}>
                <div className={style['wrap_main_sidebar']}>
                    <a href="#"></a>
                    <div className={style["sidebar__logo"]}></div>
                    <div className={style["sidebar__persional"]}>
                        <ul className={style["sidebar__list"]}>
                            <li className={[style["sidebar__item"], style["js__sidebar-tabs"], style["js__main-color sidebar__item--active"]].join(' ')}>
                                <i className={["far", "fa-play-circle", style["sidebar__item_icon"]].join(' ')}></i>
                                Cá Nhân
                            </li>
                            <li className={[style["sidebar__item"], style["js__sidebar-tabs"], style[" js__main-color"]].join(' ')}>
                                <i className={["fas", "fa-compact-disc", style["sidebar__item_icon"]].join(' ')}></i>
                                Khám Phá
                            </li>
                            <li className={[style["sidebar__item"], style["js__sidebar-tabs"], style["js__main-color"]].join(' ')}>
                                <i className={["fas", "fa-chart-line", style["sidebar__item_icon"]].join(' ')}></i>
                                #zingchart
                            </li>
                            <li className={[style["sidebar__item"], style["js__main-color sidebar__item-radio"], style["js__toast"]].join(' ')}>
                                <i className={["fas", "fa-broadcast-tower", style["sidebar__item_icon"]].join(' ')}></i>
                                Radio
                                <span className={style['sidebar__item-radio-text']}>Live</span>
                            </li>
                            <li className={[style["sidebar__item"], style["js__main-color"], style["js__toast"]].join(' ')}>
                                <i className={["far", "far", "fa-list-alt", style["sidebar__item_icon"]].join(' ')}></i>
                                Theo Dõi
                            </li>
                        </ul>
                    </div>
                    <div className={style["sidebar__line"]}></div>
                    <div className={style["sidebar__library"]}>
                        <div className={style["sidebar__library-top"]}>
                            <ul className={[style["sidebar__library-top-list"], style["sidebar__list"]].join(' ')}>
                                <li className={[style["sidebar__item"], style["js__main-color"], style["js__toast"]].join(' ')}>
                                    <i className={["fas", "fa-music", style['sidebar__item_icon']].join(' ')}></i>
                                    Nhạc Mới
                                </li>
                                <li className={[style["sidebar__item"], style["js__main-color"], style["js__toast"]].join(' ')}>
                                    <i className={["fab", "fa-buromobelexperte", style['sidebar__item_icon']].join(' ')}></i>
                                    Thể Loại
                                </li>
                                <li className={[style["sidebar__item"], style["js__main-color"], style["js__toast"]].join(' ')}>
                                    <i className={["fas", "fa-star", style['sidebar__item_icon']].join(' ')}></i>
                                    Top 100
                                </li>
                                <li className={[style["sidebar__item"], style["js__main-color"], style["js__toast"]].join(' ')}>
                                    <i className={["fas", "fa-photo-video", style['sidebar__item_icon']].join(' ')}></i>
                                    MV
                                </li>
                            </ul>
                        </div>
                        <div className={style["sidebar__library-center"]}>
                            <span className={style["sidebar__library-center-vip-heading"]}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>
                            <span className={[style["sidebar__library-center-vip-body"], style["js__toast"]].join(' ')}>Nâng cấp VIP</span>
                        </div>
                        <div className={style["sidebar__library-bot"]}>
                            <div className={[style["sidebar__library-bot-heading"], style["js__main-color"]].join(' ')}>
                                Thư viện
                                <div className={style["sidebar__library-bot-heading-option"]}>
                                    <i className={["fas", "fa-pencil-alt", style["sidebar__library-bot-heading-option-icon"]].join(' ')}></i>
                                </div>
                            </div>
                            <ul className={style["sidebar__list"]}>
                                <li className={[style["sidebar__library-bot-item"], style["sidebar__item"], style["js__sub-color"], style["js__toast"]].join(' ')}>
                                    <i className={["fas", "fa-music", style['sidebar__item_icon']].join(' ')}></i>
                                    Bài hát
                                </li>
                                <li className={[style["sidebar__library-bot-item"], style["sidebar__item"], style["js__sub-color"], style["js__toast"]].join(' ')}>
                                    <i className={["far", "fa-file-audio", style['sidebar__item_icon']].join(' ')}></i>
                                    Playlist
                                </li>
                                <li className={[style["sidebar__library-bot-item"], style["sidebar__item"], style["js__sub-color"], style["js__toast"]].join(' ')}>
                                    <i className={["fas", "fa-clock", style['sidebar__item_icon']].join(' ')}></i>
                                    Gần đây
                                </li>
                            </ul>
                            <div className={[style["sidebar__library-bot-extra"], style["sidebar__item"], style["js__toast"], style["js__sub-color"]].join(' ')}>
                                Replay
                                <span className={style["sidebar__library-bot-extra-option"]}>
                                    <i className={["fas", "fa-ellipsis-h", style['sidebar__library-bot-extra-option-icon']].join(' ')}></i>
                                </span>
                            </div>
                            <div className={[style["sidebar__library-bot-extra"], style["sidebar__item"], style["js__toast"], style["js__sub-color"]].join(' ')}>
                                Nhạc xuân
                                <span className={style["sidebar__library-bot-extra-option"]}>
                                    <i className={["fas", "fa-ellipsis-h", style['sidebar__library-bot-extra-option-icon']].join(' ')}></i>
                                </span>
                            </div>
                            <div className={[style["sidebar__library-bot-extra"], style["sidebar__item"], style["js__toast"], style["js__sub-color"]].join(' ')}>
                                Nhạc trung quốc
                                <span className={style["sidebar__library-bot-extra-option"]}>
                                    <i className={["fas", "fa-ellipsis-h", style['sidebar__library-bot-extra-option-icon']].join(' ')}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style["sidebar__add-playlist"]}>
                    <i className="fas fa-plus js__main-color"></i>
                    <span className={[style["js__main-color"], style["js__toast"], style["sidebar__add-playlist-text"]].join(' ')}>Tạo playlist mới</span>
                </div>
            </div >
        </>
    )
}
