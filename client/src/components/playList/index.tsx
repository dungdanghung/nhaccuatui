import "./playlist.css"
import { useAppContext } from "../../context"
import { useEffect, useState } from "react"
import { GetHotSongs, GetNewSongs } from "../../api/music"
import { GetListNewMV } from "../../api/mv"
import { baseIMG } from "../../config/api"
import { AddHeart, getListHistory } from "../../api/music"
import { Create, GetPlaylist } from "../../api/playlist"

export default function PlayList() {
    const { listPlay, media } = useAppContext()
    const [listSongPlay, set_listSongPlay] = useState([])
    const [listFirst, setListFirst] = useState<any>([])
    const [listLast, setListLast] = useState([])
    const [listHistory, setListHistory] = useState<any>([])
    const [typePlayList, setTypePlayList] = useState<any>('defaut')
    const [saveList, setSaveList] = useState([])

    function heart_click(id: number) {
        return (e: any) => {
            AddHeart(id)
            const heart = e.target as HTMLImageElement
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
            const heart = e.target as HTMLImageElement
            if (heart.className.includes('fas')) {
                heart.classList.remove('fas')
                heart.classList.add('far')
            } else {
                heart.classList.remove('far')
                heart.classList.add('fas')
            }
        }
    }

    function SongClick(item: any, type: string) {
        return () => {
            if (type == 'first') {
                if (media.get?.id != item['id']) {
                    media.set(item)
                    if (listPlay.get == '' || listPlay.get != 'bai_hat_noi_bat') {
                        listPlay.set('bai_hat_noi_bat')
                    }
                } else if (media.play) {
                    media.setplay(false)
                } else {
                    media.setplay(true);
                }
            } else if (type == 'last') {
                media.set(item)
                const new_list_last = listLast.filter((it) => {
                    return it['id'] != item['id']
                })
                const new_list_first = [...listFirst, item]
                setListFirst(new_list_first)
                setListLast(new_list_last)
            }
        }
    }

    function changeTypePlayList(type: string) {
        return (e: any) => {
            const active = document.querySelector('.nextsong__option-wrapper--active') as HTMLDivElement
            active.classList.remove('nextsong__option-wrapper--active')
            e.target.classList.add('nextsong__option-wrapper--active')
            if (type == 'defaut') {
                setTypePlayList('defaut')
            } else if (type == 'history') {
                setTypePlayList('history')
            } else {
                GetPlaylist()
                    .then((rs) => {
                        setSaveList(rs)
                    })
                setTypePlayList('save')
            }
        }
    }

    useEffect(() => {
        if (media.get) {
            const list = listHistory.filter((it: any) => {
                return it['id'] != media.get?.id
            })
            list.unshift(media.get)
            setListHistory(list)
        }
    }, [media.get])

    useEffect(() => {
        if (listPlay.get != '') {
            if (listPlay.get == 'bai_hat_noi_bat') {
                GetHotSongs()
                    .then((rs) => {
                        set_listSongPlay(rs)
                    })
            } else if (listPlay.get == 'moi_phat_hanh') {
                GetNewSongs()
                    .then((rs) => {
                        set_listSongPlay(rs)
                    })
            } else if (listPlay.get == 'mv_noi_bat') {
                GetListNewMV()
                    .then((rs) => {
                        set_listSongPlay(rs)
                    })
            }
        }
    }, [listPlay.get])

    useEffect(() => {
        getListHistory(undefined)
            .then((rs) => {
                setListHistory(rs)
            })
    }, [])


    useEffect(() => {
        if (listSongPlay.length != 0) {
            const data_fist = [] as any
            const data_last = [] as any
            listSongPlay.forEach((item) => {
                if (item['id'] == media.get?.id) {
                    data_fist.push(item)
                } else {
                    data_last.push(item)
                }
            })
            setListFirst(data_fist)
            setListLast(data_last)
        }
    }, [listSongPlay])

    return (
        <div className="main-nextsong mobile-tablet-hiden">
            <div className="nextsong__option">
                <div className="nextsong__option-wrapper">
                    <div className="nextsong__option-wrapper-listplay nextsong__option-wrapper--active js__toast js__main-color" onClick={changeTypePlayList('defaut')}>Danh sách phát</div>
                    <div className="nextsong__option-wrapper-history js__sub-color js__toast" onClick={changeTypePlayList('history')}>Nghe gần đây</div>
                </div>
                <div className="nextsong__option-alarm laptop-hiden js__toast" onClick={changeTypePlayList('save')}>
                    <i className="fas fa-bookmark"></i>
                </div>
                <div className="nextsong__option-more laptop-hiden js__toast">
                    <i className="fas fa-ellipsis-h js__main-color"></i>
                </div>
            </div>
            <div className="nextsong__box" style={{ display: `${typePlayList == 'defaut' ? 'block' : 'none'}` }}>
                <div className="nextsong__fist" style={{ padding: '0px 20px' }} >
                    {
                        listFirst.map((item: any) => {
                            return (
                                <li key={item['id']} className={`songs-item ${media.get?.id == item['id'] ? 'songs-item--active' : ''}`} data-index={item['id']}>
                                    <div className="songs-item-left">
                                        <div style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${item['image']})` }} className="songs-item-left-img nextsong__fist_img js__songs-item-left-img-0"
                                            onClick={SongClick(item, 'first')}
                                        >
                                            {
                                                media.get?.id == item['id'] ?
                                                    media.play ?
                                                        <div className="songs-item-left-img-playing-box">
                                                            <img className="songs-item-left-img-playing" src="/src/assets/img/svg/icon-playing.gif" alt="playing" />
                                                        </div> : <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
                                                    <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div>
                                            }
                                        </div>

                                        <div className="songs-item-left-body">
                                            <h3 className="songs-item-left-body-name js__main-color">{item['title']}</h3>
                                            <span className="songs-item-left-body-singer js__sub-color">{JSON.parse(item['artists']).join(' ')}</span>
                                        </div>
                                    </div>

                                    <div className="songs-item-right mobile-hiden">
                                        <span className="songs-item-right-tym heart wrap_heart" onClick={heart_click(item['id'])}>
                                            {
                                                item['check_heart'] ?
                                                    <i className="fas fa-heart"></i> :
                                                    <i className="far fa-heart"></i>
                                            }
                                        </span>

                                        <span className="songs-item-right-more wrap_playlist js__main-color" onClick={addPlaylist(item['id'])}>
                                            {
                                                item['check_playlist'] ?
                                                    <i className="fas fa-bookmark"></i> :
                                                    <i className="far fa-bookmark"></i>
                                            }
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </div >
                <div className="nextsong__last">
                    <h3 className="nextsong__last-heading js__main-color">Tiếp theo</h3>
                    <ul className="nextsong__last-list">
                        {
                            listLast.map((item) => {
                                return (
                                    <li key={item['id']} className={`new_song_item songs-item last_song_item${item['id']}`} style={{ width: '100%' }}>
                                        <div className="songs-item-left">
                                            <div className="songs-item-left-img nextsong__last_img js__songs-item-left-img-0" style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${item['image']})` }}
                                                onClick={SongClick(item, 'last')}
                                            >
                                                <div className="songs-item-left-img-playbtn">
                                                    <i className="fas fa-play" />
                                                </div>
                                            </div >
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name js__main-color">{item['title']}</h3>
                                                <span className="songs-item-left-body-singer js__sub-color">{JSON.parse(item['artists']).join(' ')}</span>
                                            </div>
                                        </div >
                                    </li >
                                )
                            })
                        }
                    </ul>
                </div>
            </div >
            <div className="nextsong__box" style={{ display: `${typePlayList == 'history' ? 'block' : 'none'}` }}>
                <div className="nextsong__last">
                    <ul className="nextsong__last-list">
                        {
                            listHistory.map((item: any) => {
                                return (
                                    <li key={item['id']} className={`songs-item ${media.get?.id == item['id'] ? 'songs-item--active' : ''}`} data-index={item['id']}>
                                        <div className="songs-item-left">
                                            <div style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${item['image']})` }} className="songs-item-left-img nextsong__fist_img js__songs-item-left-img-0"
                                                onClick={() => {
                                                    if (media.get?.id != item['id']) {
                                                        media.set(item)
                                                    } else if (media.play) {
                                                        media.setplay(false)
                                                    } else {
                                                        media.setplay(true);
                                                    }
                                                }}
                                            >
                                                {
                                                    media.get?.id == item['id'] ?
                                                        media.play ?
                                                            <div className="songs-item-left-img-playing-box">
                                                                <img className="songs-item-left-img-playing" src="/src/assets/img/svg/icon-playing.gif" alt="playing" />
                                                            </div> : <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
                                                        <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div>
                                                }
                                            </div>

                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name js__main-color">{item['title']}</h3>
                                                <span className="songs-item-left-body-singer js__sub-color">{JSON.parse(item['artists']).join(' ')}</span>
                                            </div>
                                        </div>

                                        <div className="songs-item-right mobile-hiden">
                                            <span className="songs-item-right-tym heart wrap_heart" onClick={heart_click(item['id'])}>
                                                {
                                                    item['check_heart'] ?
                                                        <i className="fas fa-heart"></i> :
                                                        <i className="far fa-heart"></i>
                                                }
                                            </span>

                                            <span className="songs-item-right-more wrap_playlist js__main-color" onClick={addPlaylist(item['id'])}>
                                                {
                                                    item['check_playlist'] ?
                                                        <i className="fas fa-bookmark"></i> :
                                                        <i className="far fa-bookmark"></i>
                                                }
                                            </span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div >
            <div className="nextsong__box" style={{ display: `${typePlayList == 'save' ? 'block' : 'none'}` }}>
                <div className="nextsong__last">
                    <ul className="nextsong__last-list">
                        {
                            saveList.map((item: any) => {
                                return (
                                    <li key={item['id']} className={`songs-item ${media.get?.id == item['id'] ? 'songs-item--active' : ''}`} data-index={item['id']}>
                                        <div className="songs-item-left">
                                            <div style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${item['image']})` }} className="songs-item-left-img nextsong__fist_img js__songs-item-left-img-0"
                                                onClick={() => {
                                                    if (media.get?.id != item['id']) {
                                                        media.set(item)
                                                    } else if (media.play) {
                                                        media.setplay(false)
                                                    } else {
                                                        media.setplay(true);
                                                    }
                                                }}
                                            >
                                                {
                                                    media.get?.id == item['id'] ?
                                                        media.play ?
                                                            <div className="songs-item-left-img-playing-box">
                                                                <img className="songs-item-left-img-playing" src="/src/assets/img/svg/icon-playing.gif" alt="playing" />
                                                            </div> : <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
                                                        <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div>
                                                }
                                            </div>

                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name js__main-color">{item['title']}</h3>
                                                <span className="songs-item-left-body-singer js__sub-color">{JSON.parse(item['artists']).join(' ')}</span>
                                            </div>
                                        </div>

                                        <div className="songs-item-right mobile-hiden">
                                            <span className="songs-item-right-tym heart wrap_heart" onClick={heart_click(item['id'])}>
                                                {
                                                    item['check_heart'] ?
                                                        <i className="fas fa-heart"></i> :
                                                        <i className="far fa-heart"></i>
                                                }
                                            </span>

                                            <span className="songs-item-right-more wrap_playlist js__main-color" onClick={addPlaylist(item['id'])}>
                                                {
                                                    item['check_playlist'] ?
                                                        <i className="fas fa-bookmark"></i> :
                                                        <i className="far fa-bookmark"></i>
                                                }
                                            </span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div >
        </div >
    )
}
