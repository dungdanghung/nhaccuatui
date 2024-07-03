import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import "./manager.css"
import Select_option_type_song from "../../components/select_option/select_option_type_song";
import Select_option_country from "../../components/select_option/select_option_country"
import { GetLyric, GetSongMediaDetail } from "../../api/music";
import { baseIMG } from "../../config/api";
import { EditSongDetail } from "../../api/music";
import { useAppContext } from "../../context";
import listCountry from '../../helper/country_data.json'
import listGenre from '../../helper/primary_genre_music.json'
import ModalTextLyric from "../../components/modal/modal_text_lyric";

export default function Detail() {
    const [song, setsong] = useState<any>([]);
    const [title, settitle] = useState("");
    const [artists, setartists] = useState([]);
    const [show_image, set_show_image] = useState(false)
    const { media } = useAppContext()
    const [lyric, setLyric] = useState([])


    let { id } = useParams();
    useEffect(() => {
        GetSongMediaDetail(id)
            .then((rs) => {
                if (rs) {
                    setsong(rs);
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
            media.set(song)
            media.setplay(true)
        }
    }

    useEffect(() => {
        if (song['id']) {
            settitle(song['title'])
            const artists = JSON.parse(song['artists'])
            setartists(artists);
            const date1 = new Date(song['originaly_released'])
            const dateElement = document.querySelector('.rriginaly_released') as HTMLInputElement
            dateElement.value = date1.toISOString().split('T')[0]

            listCountry.every((item) => {
                if (item.key == song['language']) {
                    const a = document.querySelector('#country') as HTMLInputElement
                    a.value = item.value
                    return false
                }
                return true
            })
            listGenre.every((item) => {
                if (item == song['primary_genre'] || item == song['secondary_genre']) {
                    if (item == song['primary_genre']) {
                        const a = document.querySelector('#primary_genre') as HTMLInputElement
                        a.value = item
                    } else {
                        const a = document.querySelector('#secondary_genre') as HTMLInputElement
                        a.value = item
                    }
                }
                return true
            })

            if (song['lyric_file']) {
                GetLyric(song['lyric_file'])
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
        }
    }, [song])

    function addArtistInput() {
        const a = document.querySelector(".form-item .artist-wrap") as HTMLDivElement
        const b = `
        <div class="artist-item">
        <div class="form-item-1"></div>
        <div class="form-item-2">
            <input class="artist" type="text" name="artists[]" />
            <div class="icon-delete">
                <i class="fas fa-ban"></i>
                <div class="wrap"></div>
            </div>
        </div>
        </div>
        `
        a.insertAdjacentHTML('beforeend', b);
        const c = document.querySelectorAll('.icon-delete .wrap')
        c[c.length - 1].addEventListener('click', deleteArtistInput)
    }

    function deleteArtistInput(e: any) {
        if (e.target.parentElement.parentElement.parentElement.className == "artist-item") {
            e.target.parentElement.parentElement.parentElement.remove()
        }
    }


    function save() {
        const listInput = document.querySelectorAll('input[name]')
        const formDate = new FormData
        for (const element of listInput) {
            const a = element as HTMLInputElement
            if (a.name != "vehicle") {
                if (a.name == 'language') {
                    listCountry.forEach((item) => {
                        if (item.value == a.value) {
                            formDate.append('language', item.key)
                        }
                    })
                } else if (a.className == "lyric_input") {
                    const files = a.files as FileList
                    formDate.append('lyric_file', files[0])
                } else {
                    formDate.append(a.name, a.value)
                }
            }
        }
        formDate.append('id', song['id'])
        EditSongDetail(formDate)
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
                <div className="contain_1_song">
                    <img className="image_song_detail" src={`${baseIMG}uploads/image/672x376/${song['image']}`} onClick={showimage} />
                </div>
                <div className="contain_1_play">
                    <div className="wrap_img" onClick={play_of_pause}>
                        {
                            media.play ?
                                <i className="fas fa-pause playmusic"></i> :
                                <i className="fas fa-play pausemusic"></i>
                        }
                    </div>
                    <ModalTextLyric text={lyric} />
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
                                Language:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <Select_option_country />
                        </div>
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
                        <div className="artist-wrap">
                            {
                                artists.map((item, key) => {
                                    return (
                                        <div key={key} className="artist-item">
                                            <div className="form-item-1">
                                                {
                                                    key == 0 ?
                                                        <span className="text">
                                                            Artist:
                                                        </span> : <></>
                                                }
                                            </div>
                                            <div className="form-item-2">
                                                <input className="artist" type="text" defaultValue={item} name="artists[]" />
                                                {
                                                    key == 0 ?
                                                        <div className="icon" onClick={addArtistInput}>
                                                            <i className="fas fa-plus"></i>
                                                        </div>
                                                        :
                                                        <div className="icon" onClick={addArtistInput}>
                                                            <i className="fas fa-ban"></i>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Primary Genre:
                            </span>
                            <input className="primary_genre" name="primary_genre" defaultValue={song['primary_genre']} hidden></input>
                        </div>
                        <div className="form-item-2">
                            <Select_option_type_song type={'primary_genre'} />
                        </div>
                    </div>
                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Secondary Genre:
                            </span>
                            <input className="secondary_genre" name="secondary_genre" defaultValue={song['secondary_genre']} hidden></input>
                        </div>
                        <div className="form-item-2">
                            <Select_option_type_song type={'secondary_genre'} />
                        </div>
                    </div>
                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Composition Copyright:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <input className="composition_copyright" defaultValue={song['composition_copyright']} name="composition_copyright" type="text" />
                        </div>
                    </div>
                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Record Laber Name:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <input className="record_laber_name" defaultValue={song['record_laber_name']} name="record_laber_name" type="text" />
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
                            <img src={`${baseIMG}uploads/image/1280x720/${song['image']}`} />
                        </div>
                    </div> : <></>
            }
        </div>
    )
}
