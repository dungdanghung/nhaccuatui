import Select_option_country from "../../components/select_option/select_option_country"
import Select_option_type_song from "../../components/select_option/select_option_type_song"
import "./create.css"
import { useAppContext } from "../../context"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import dataContry from '../../helper/country_data.json'

export default function Album_detail() {
    const navigate = useNavigate()
    const [test, settest] = useState(false);
    const { release_title, song_create } = useAppContext()
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

    function save() {
        const listInput = document.querySelectorAll('input[name]')
        const formDate = new FormData
        for (const element of listInput) {
            const a = element as HTMLInputElement
            if (a.name != "vehicle") {
                if (a.name == 'language') {
                    dataContry.forEach((item) => {
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
        // console.log(formDate.get('language'))
        song_create.setFormData(formDate);
        navigate('/create/song')
    }

    return (
        <div className="wrap">
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
                        <input className="title-input" name="title" type="text" value={release_title.get} onChange={() => { }} />
                    </div>
                </div>
                <div className="form-item">
                    <div className="artist-wrap">
                        <div className="artist-item">
                            <div className="form-item-1">
                                <span className="text">
                                    Artist:
                                </span>
                            </div>
                            <div className="form-item-2">
                                <input className="artist" type="text" name="artists[]" />
                                <div className="icon" onClick={addArtistInput}>
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-item">
                    <div className="form-item-1">
                        <span className="text">
                            Primary Genre:
                        </span>
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
                        <input className="composition_copyright" name="composition_copyright" type="text" />
                    </div>
                </div>
                <div className="form-item">
                    <div className="form-item-1">
                        <span className="text">
                            Record Laber Name:
                        </span>
                    </div>
                    <div className="form-item-2">
                        <input className="record_laber_name" name="record_laber_name" type="text" />
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
    )
}
