import "./song_detail.css"
import { useAppContext } from "../../context"
import { AddHeart, GetSongDetail } from "../../api/music"
import { Create } from "../../api/playlist"
import { useEffect, useState } from "react"
import { GetLyric } from "../../api/music"
import { baseIMG } from "../../config/api"
import { useSearchParams } from "react-router-dom"

export default function index() {
    const { media, lyric_active } = useAppContext()
    const [searchParams, setSearchParams] = useSearchParams();
    const [type, setType] = useState('detail')
    const [lyric, setLyric] = useState([])
    const [action_of_btn_play, set_action_of_btn_play] = useState<string>('pause')

    function heart_click(id: any) {
        return (e: any) => {
            AddHeart(id)
            const heart = document.querySelectorAll('.wrap_heart i') as NodeListOf<HTMLImageElement>
            heart.forEach((element) => {
                if (element.className.includes('fas')) {
                    element.classList.remove('fas')
                    element.classList.add('far')
                } else {
                    element.classList.remove('far')
                    element.classList.add('fas')
                }
            })
        }
    }
    function addPlaylist(id: any) {
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

    useEffect(() => {
        const value = searchParams.get('value')
        if (value) {
            GetSongDetail(value)
                .then((rs) => {
                    media.set(rs);
                    return rs
                })
                .then((rs) => {
                    if (rs['lyric_file']) {
                        GetLyric(rs['lyric_file'])
                            .then((rs: string) => {
                                return rs.trim().split("\n")
                            })
                            .then((rs) => {
                                const formatData = [] as any
                                rs.forEach((item, index) => {
                                    let value = "";
                                    let line = item.trim();
                                    let minute = parseInt(line.substr(1, 2));
                                    let second = parseInt(line.substr(4, 5));
                                    let milisecond = line.substr(6, 3);
                                    if (minute != 0) value = minute * 60 + second + milisecond
                                    else value = minute + second + milisecond
                                    let text = line.substr(line.indexOf(']') + 1, line.length).trim();
                                    formatData.push({
                                        'value': value,
                                        'text': text
                                    })
                                })
                                setLyric(formatData)
                            })
                    }
                })
        }
    }, [])

    useEffect(() => {
        if (lyric_active.get) {
            const highlight_lyric = document.querySelector('.highlight_lyric') as HTMLLIElement
            const LyricActive = document.querySelector(`li[value="${lyric_active.get}"]`) as HTMLLIElement
            const ActiveLyric = document.querySelector('li.active_lyric') as HTMLLIElement
            const wrapLyric = document.querySelector('.lyric_content') as HTMLUListElement
            if (ActiveLyric) ActiveLyric.classList.remove('active_lyric')
            LyricActive?.classList.add('active_lyric')
            const top = LyricActive?.offsetTop;
            highlight_lyric.style.top = top + 'px'
            const scrollTop = top - (wrapLyric.clientHeight / 2) + (36 / 2);
            wrapLyric.scrollTop = scrollTop;
            highlight_lyric.style.display = 'block'
        }
    }, [lyric_active.get])

    useEffect(() => {
        if (media.play) {
            set_action_of_btn_play('pause')
        } else set_action_of_btn_play('play')
    }, [media.play])

    return (
        <div className="content" style={{ padding: '45px' }}>
            <div className="detail_song">
                <div className="detail_song_image">
                    <div className="wrap_image">
                        <img src={media.get?.image ? `${baseIMG}uploads/image/672x376/${media.get.image}` : 'src/assets/orther/song.jpg'} />
                    </div>
                </div>
                <div className="detail_song_title">
                    <div className="title">{media.get?.title ? media.get.title : ''}</div>
                    <div className="artists">
                        {
                            media.get?.artists ?
                                JSON.parse(media.get.artists).join(' ') :
                                ''
                        }
                    </div>
                </div>
                <div className="detail_song_play" onClick={() => {
                    if (media.play) {
                        media.setplay(false)
                    } else {
                        media.setplay(true)
                    }
                }}>
                    {
                        action_of_btn_play == 'pause' ?
                            <i className="fas fa-pause"></i> :
                            <i className="fas fa-play"></i>
                    }
                    {
                        action_of_btn_play == 'pause' ?
                            <span>Tạm dừng</span> :
                            <span>Phát bài hát</span>
                    }

                </div>
                <div className="detail_song_action">
                    <span className="songs-item-right-tym heart wrap_heart" onClick={heart_click(media.get?.id)}>
                        {
                            media.get?.check_heart ?
                                <i className="fas fa-heart"></i> :
                                <i className="far fa-heart"></i>
                        }
                    </span>

                    <span className="songs-item-right-more wrap_playlist js__main-color" onClick={addPlaylist(media.get?.id)}>
                        {
                            media.get?.check_playlist ?
                                <i className="fas fa-bookmark"></i> :
                                <i className="far fa-bookmark"></i>
                        }
                    </span>
                </div>
            </div>

            <div className="detail_option_song">
                <div className="select_option">
                    <div className="select_option_item" onClick={() => setType('detail')} >
                        <span className={type == "detail" ? 'active' : ''}>Bài hát</span>
                    </div>
                    <div className="select_option_item" onClick={() => setType('lyric')}>
                        <span className={type == 'lyric' ? 'active' : ''}>Lyric</span>
                    </div>
                </div>


                <div className="row_new_songs" style={{ display: type == 'detail' ? 'block' : 'none' }}>

                    <li className="new_song_item songs-item songs-item--active" style={{ width: '100%' }}>
                        <div className="songs-item-left">
                            <div className="songs-item-left-img js__songs-item-left-img-0" style={{ backgroundImage: `url(${media.get?.image ? `${baseIMG}uploads/image/168x94/${media.get.image}` : 'src/assets/orther/song.jpg'})` }}
                                onClick={() => {
                                    if (media.play) {
                                        media.setplay(false)
                                    } else {
                                        media.setplay(true)
                                    }
                                }}
                            >
                                {
                                    media.get?.id ?
                                        media.play ?
                                            <div className="songs-item-left-img-playing-box">
                                                <img className="songs-item-left-img-playing" src="/src/assets/img/svg/icon-playing.gif" alt="playing" />
                                            </div> : <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
                                        <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div>
                                }
                            </div>

                            <div className="songs-item-left-body">
                                <h3 className="songs-item-left-body-name js__main-color">{media.get?.title}</h3>
                                <span className="songs-item-left-body-singer js__sub-color">{JSON.parse(media.get?.artists ? media.get.artists : '[]').join(' ')}</span>
                            </div>
                        </div>

                        <div className="songs-item-right mobile-hiden">
                            <span className="songs-item-right-tym heart wrap_heart" onClick={heart_click(media.get?.id)} >
                                {
                                    media.get?.check_heart ?
                                        <i className="fas fa-heart"></i> :
                                        <i className="far fa-heart"></i>
                                }
                            </span>

                            <span className="songs-item-right-more wrap_playlist js__main-color" onClick={addPlaylist(media.get?.id)}>
                                {
                                    media.get?.check_playlist ?
                                        <i className="fas fa-bookmark"></i> :
                                        <i className="far fa-bookmark"></i>
                                }
                            </span>
                        </div>
                    </li>

                </div>

                <div className="detail_option_song_detail" style={{ display: type == 'detail' ? 'flex' : 'none' }}>
                    <div className="song_detail_title">Thông Tin</div>
                    <div className="song_detail_relistDay">
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Ngày phát hành:</span>
                        <span>{media.get?.originaly_released}</span>
                    </div>
                    <div className="song_detail_supply">
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Cung cấp bởi:</span>
                        <span>{media.get?.composition_copyright}</span>
                    </div>
                </div>

                <div className="wrap_lyric" style={{ display: type == 'lyric' ? 'block' : 'none' }}>
                    <ul className="lyric_content">
                        <li className="highlight_lyric"></li>
                        {
                            lyric.map((item, index) => {
                                return (
                                    <li value={item['value']} key={index}>{item['text']}</li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}
