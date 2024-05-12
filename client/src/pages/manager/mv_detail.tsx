import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import "./manager.css"
import { GetMVDetail } from "../../api/mv";
import { baseIMG } from "../../config/api";
import { EditMVDetail } from "../../api/mv";
import { useAppContext } from "../../context";

export default function Mv_detail() {
    const [mv, setmv] = useState<any>([]);
    const [title, settitle] = useState("");
    const [show_image, set_show_image] = useState(false)
    const { media } = useAppContext()

    let { id } = useParams();
    useEffect(() => {
        GetMVDetail(id)
            .then((rs) => {
                if (rs) {
                    setmv(rs);
                    media.set(rs);
                }
            })
    }, [])

    function play_of_pause(e: React.MouseEvent<HTMLDivElement>) {
        const element = e.target as HTMLImageElement
        if (element.className.includes('playmusic')) {
            media.setplay(false)
            media.setplay(false)
        } else {
            media.setplay(true)
            media.set(mv)
            media.setplay(true)
        }
    }

    useEffect(() => {
        if (mv['id']) {
            settitle(mv['title'])
            const date1 = new Date(mv['originaly_released'])
            const dateElement = document.querySelector('.rriginaly_released') as HTMLInputElement
            dateElement.value = date1.toISOString().split('T')[0]
        }
    }, [mv])


    function save() {
        const listInput = document.querySelectorAll('input[name]')
        const formDate = new FormData
        for (const element of listInput) {
            const a = element as HTMLInputElement
            if (a.name != "vehicle") {
                if (a.className == "lyric_input") {
                    const files = a.files as FileList
                    formDate.append('lyric_file', files[0])
                } else {
                    formDate.append(a.name, a.value)
                }
            }
        }
        formDate.append('id', mv['id'])
        EditMVDetail(formDate)
            .then((rs) => {
                console.log(rs);
            })
    }

    function showimage() {
        if (show_image) {
            set_show_image(false)
        } else {
            set_show_image(true)
        }
    }


    return (
        <div className="wrap_detail_upload">
            <div className="detail_contain_1">
                <div className="contain_1_mv">
                    <img className="image_song_detail" src={`${baseIMG}uploads/image/672x376/${mv['image']}`} onClick={showimage} />
                </div>
                <div className="contain_1_play">
                    <div className="wrap_img" onClick={play_of_pause}>
                        {
                            media.play ?
                                <i className="fas fa-pause playmusic"></i> :
                                <i className="fas fa-play pausemusic"></i>
                        }
                    </div>
                </div>
            </div>



            <div className="detail_contain_2">
                <form action="#" className="form">
                    <div className="header-form">
                        <h2>Album Details</h2>
                    </div>

                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Title:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <input className="title-input" name="title" type="text" value={title} onChange={e => { settitle(e.target.value) }} />
                        </div>
                    </div>



                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Composition Copyright:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <input className="composition_copyright" defaultValue={mv['composition_copyright']} name="composition_copyright" type="text" />
                        </div>
                    </div>

                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Originaly Released:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <input className="rriginaly_released" name="originaly_released" type="date" />
                        </div>
                    </div>

                    <div className="form-item">
                        <div className="save" onClick={save}>
                            <div className="save-btn">Save</div>
                        </div>
                    </div>
                </form>
            </div>
            {
                show_image ?
                    <div className="wrap_image" onClick={showimage}>
                        <div className="image">
                            <img src={`${baseIMG}uploads/image/1280x720/${mv['image']}`} />
                        </div>
                    </div> : <></>
            }



        </div>
    )
}
