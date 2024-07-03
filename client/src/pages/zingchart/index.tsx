import "./zingchart.css"
import { GetZingchart, AddHeart } from "../../api/music"
import { useEffect, useState } from "react"
import { baseIMG } from "../../config/api"
import { useAppContext } from "../../context"
import { Create } from "../../api/playlist"

export default function Zingchart() {
    const [zingchartlist, setzingchartlist] = useState([])
    const { media } = useAppContext()
    useEffect(() => {
        GetZingchart()
            .then((rs) => {
                if (rs) setzingchartlist(rs)
            })
    }, [])

    function show_all() {
        const list = document.querySelectorAll('.zingchart_item') as NodeListOf<HTMLDivElement>
        list.forEach(element => {
            element.style.display = 'block'
        });
        document.querySelector('.zingchart__100more')?.remove();
    }

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
        <div className="content">
            <div className="main-container-zingchart main_content js__container-panes ">
                <div className="zingchart__headding js__main-color">
                    #zingchart
                </div>
                <ul className="zingchart__list js__zingchart__list">
                    {
                        zingchartlist.map((item, index) => {

                            return (
                                <div key={item['id']} className="zingchart_item" style={{ display: `${index < 10 ? 'block' : 'none'}` }}>
                                    <li className="songs-item">
                                        <div className="songs-item-left">
                                            <span className="zingchart__item-left-stt ${index == 0 ? 'zingchart__item-first': index == 1 ? 'zingchart__item-second' : index == 2 ? 'zingchart__item-third' : ''}">${index + 1}</span>
                                            <span className="zingchart__item-left-line js__main-color">-</span>
                                            <div style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${item['image']})`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPositionX: "center" }} className="songs-item-left-img" onClick={() => {
                                                if (media.get?.id != item['id']) {
                                                    media.set(item)
                                                    media.setplay(true)
                                                } else if (media.play) {
                                                    media.setplay(false)
                                                } else {
                                                    media.setplay(true)
                                                }
                                            }}>
                                                {
                                                    media.get?.id == item['id'] ?
                                                        media.play ?
                                                            <div className="songs-item-left-img-playing-box">
                                                                <img className="songs-item-left-img-playing" src="src/assets/img/svg/icon-playing.gif" alt="playing" />
                                                            </div> :
                                                            <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
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
                                </div>
                            )
                        })
                    }
                </ul>
                <div className="zingchart__100more">
                    <span className="zingchart__100more-body js__main-color js__border js__zingchart__100more" onClick={show_all}>Xem top
                        100</span>
                </div>
            </div>
        </div>
    )
}
