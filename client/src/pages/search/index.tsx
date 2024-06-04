import { useEffect, useState } from 'react';
import './search.css'
import '../manager/manager.css'
import '../home/home_content.css'
import { useSearchParams } from 'react-router-dom';
import { SearchSong } from '../../api/music';
import { useAppContext } from '../../context';
import { baseIMG } from '../../config/api';
import { AddHeart } from '../../api/music';
import { Create } from '../../api/playlist';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataSearch, setDataSearch] = useState([]);
    const { media } = useAppContext()

    useEffect(() => {
        SearchSong(searchParams.get("value"))
            .then((rs) => {
                setDataSearch(rs)
            })
    }, [])

    function heart_click(id: number) {
        return (e: any) => {
            AddHeart(id)
            const element = e.target as HTMLSpanElement
            const heart = element.children[0] as HTMLImageElement
            if (heart.className.includes('fas')) {
                heart.classList.remove('fas')
                heart.classList.add('far')
            } else {
                heart.classList.remove('far')
                heart.classList.add('fas')
            }
        }
    }
    function addPlaylist(id: number) {
        return (e: any) => {
            Create(id)
            const element = e.target as HTMLSpanElement
            const heart = element.children[0] as HTMLImageElement
            if (heart.className.includes('fas')) {
                heart.classList.remove('fas')
                heart.classList.add('far')
            } else {
                heart.classList.remove('far')
                heart.classList.add('fas')
            }
        }
    }

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
                                            Tìm kiếm</div><button className="zm-btn button">
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
                                        <div>

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

                                                        <div className="media-right">
                                                            <div className="column-text">
                                                                action</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {
                                                            dataSearch.map(($item) => {
                                                                return (
                                                                    <li key={$item['id']} className={`songs-item ${media.get?.id == $item['id'] ? 'songs-item--active' : ''}`} data-index={$item['id']}>
                                                                        <div className="songs-item-left">
                                                                            <div style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${$item['image']})` }} className="songs-item-left-img js__songs-item-left-img-0"
                                                                                onClick={() => {
                                                                                    if (media.get?.id != $item['id']) {
                                                                                        media.set($item)
                                                                                    } else if (media.play) {
                                                                                        media.setplay(false)
                                                                                    } else {
                                                                                        media.setplay(true);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {
                                                                                    media.get?.id == $item['id'] ?
                                                                                        media.play ?
                                                                                            <div className="songs-item-left-img-playing-box">
                                                                                                <img className="songs-item-left-img-playing" src="/src/assets/img/svg/icon-playing.gif" alt="playing" />
                                                                                            </div> : <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
                                                                                        <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div>
                                                                                }
                                                                            </div>

                                                                            <div className="songs-item-left-body">
                                                                                <h3 className="songs-item-left-body-name js__main-color">{$item['title']}</h3>
                                                                                <span className="songs-item-left-body-singer js__sub-color">{JSON.parse($item['artists']).join(' ')}</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* <div className="songs-item-right mobile-hiden">
                                                                            <span className="songs-item-right-tym heart wrap_heart" onClick={heart_click($item['id'])}>
                                                                                {
                                                                                    $item['check_heart'] ?
                                                                                        <i className="fas fa-heart"></i> :
                                                                                        <i className="far fa-heart"></i>
                                                                                }
                                                                            </span>

                                                                            <span className="songs-item-right-more wrap_playlist js__main-color" onClick={addPlaylist($item['id'])}>
                                                                                {
                                                                                    $item['check_playlist'] ?
                                                                                        <i className="fas fa-bookmark"></i> :
                                                                                        <i className="far fa-bookmark"></i>
                                                                                }
                                                                            </span>
                                                                        </div> */}

                                                                    </li>
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


        </div >
    )
}
