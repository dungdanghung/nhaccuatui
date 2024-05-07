import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import "./manager.css"
import Select_option_type_song from "../../components/select_option/select_option_type_song";
import Select_option_country from "../../components/select_option/select_option_country"
import { GetSongDetail } from "../../api/music";
import { baseIMG } from "../../config/api";
import { EditSongDetail } from "../../api/music";
import { useAppContext } from "../../context";

export default function Detail() {
    const [song, setsong] = useState<any>([]);
    const [test, settest] = useState(false);
    const [title, settitle] = useState("");
    const [artists, setartists] = useState([]);
    const [show_image, set_show_image] = useState(false)
    const { music } = useAppContext()

    let { id } = useParams();
    useEffect(() => {
        GetSongDetail(id)
            .then((rs) => {
                if (rs) {
                    setsong(rs);
                    music.set(rs);
                }
            })
    }, [])

    function play_of_pause(e: React.MouseEvent<HTMLDivElement>) {
        const element = e.target as HTMLImageElement
        if (element.className.includes('playmusic')) {
            music.setplay(false)
            music.setplay(false)
        } else {
            music.setplay(true)
            music.set(song)
            music.setplay(true)
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
        }
    }, [song])

    function test1(e: any) {
        const a = document.querySelector('.Language_value') as HTMLInputElement
        a.value = e.target.getAttribute('value')
    }
    function test2(e: any) {
        const a = document.querySelector('.primary_genre') as HTMLInputElement
        a.value = e.target.getAttribute('value')
    }
    function test3(e: any) {
        const a = document.querySelector('.secondary_genre') as HTMLInputElement
        a.value = e.target.getAttribute('value')
    }

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
    function addArtistLyricInput() {
        const a = document.querySelector(".wrap-lyrics-detail .artist-wrap") as HTMLDivElement
        const b = `
        <div class="artist-item">
        <div class="form-item-2">
            <input class="lyrics_artist" type="text" name="lyrics_artist[]" />
            <div class="icon-delete clear">
                <i class="fas fa-ban"></i>
                <div class="wrap"></div>
            </div>
        </div>
    </div>
        `
        a.insertAdjacentHTML('beforeend', b);
        const c = document.querySelector(".wrap-lyrics-detail .artist-wrap .artist-item .clear") as HTMLDivElement
        c.addEventListener('click', deleteArtistInput)
    }

    function deleteArtistInput(e: any) {
        if (e.target.parentElement.parentElement.parentElement.className == "artist-item") {
            e.target.parentElement.parentElement.parentElement.remove()
        }
    }

    function lyricTrigger(e: any) {
        if (e.target.id == 'vehicle1') {
            settest(true)
        } else {
            settest(false)
        }
    }

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
                            music.play ?
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
                                Language:
                            </span>
                            <input name="language" className="Language_value" type="text" defaultValue={song['language']} hidden={true}></input>
                        </div>
                        <div className="form-item-2">
                            <Select_option_country fc_click={test1} value={song['language']} />
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
                    {/* <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Lyrics:
                            </span>
                        </div>
                        <div className="form-item-2">
                            <div>
                                <span>
                                    Does this release contain lyrics?
                                </span>
                                <div className="select">
                                    <div>
                                        <input type="radio" id="vehicle1" name="vehicle" onClick={lyricTrigger} />
                                        <label>Yes</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="vehicle2" name="vehicle" defaultChecked onClick={lyricTrigger} />
                                        <label>No</label>
                                    </div>
                                </div>
                                {
                                    test ? <>  <div className="wrap-lyrics-detail">
                                        <div className="form-item">
                                            <div className="form-item-2">
                                                <input className="lyric_input" type="file" name="lyric_input" />
                                            </div>
                                        </div>

                                        <div className="form-item">
                                            <div>
                                                <span>Artist Name</span>
                                                <div className="artist-wrap">
                                                    <div className="artist-item">
                                                        <div className="form-item-2">
                                                            <input className="lyrics_artist" type="text" name="lyrics_artist[]" />
                                                            <div className="icon" onClick={addArtistLyricInput}>
                                                                <i className="fas fa-plus"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </> :
                                        <></>
                                }

                            </div>
                        </div>
                    </div> */}
                    <div className="form-item">
                        <div className="form-item-1">
                            <span className="text">
                                Primary Genre:
                            </span>
                            <input className="primary_genre" name="primary_genre" defaultValue={song['primary_genre']} hidden></input>
                        </div>
                        <div className="form-item-2">
                            <Select_option_type_song fc_click={test2} value={song['primary_genre']} />
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
                            <Select_option_type_song fc_click={test3} value={song['secondary_genre']} />
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
