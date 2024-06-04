import './create.css'
import { Link } from "react-router-dom"
import { useAppContext } from '../../context'
import { useEffect, useState } from 'react'
import { CreateMusic } from "../../api/music"

export default function CreateSong() {
    const { song_create } = useAppContext()
    const [detail_title, set_detail_title] = useState<string | undefined>()
    const [artist_title, set_artist_title] = useState<string | undefined>()
    const [genre_title, set_genre_title] = useState<string | undefined>()
    const [Label_title, set_Label_title] = useState<string | undefined>()
    const [release_date_title, set_release_date_title] = useState<string | undefined>()
    const [Submit, setSubmit] = useState<boolean>(false)


    function renderImage(input: File) {
        if (input) {
            var reader = new FileReader();
            reader.onload = function (e) {
                const a = document.querySelector('.artist_detail') as HTMLImageElement
                a.src = e.target?.result as string
            }
            reader.readAsDataURL(input);
        }
    }

    function send() {
        CreateMusic(song_create.formData)
            .then((rs) => {
                if (rs) {
                    song_create.setFormData(undefined);
                    window.location.reload();
                }
            })
    }

    useEffect(() => {
        if (song_create.formData?.get('audio') && song_create.formData.get('image') && song_create.formData) {
            set_detail_title(song_create.formData.get('title') as string)
            const image = song_create.formData.get('image') as File
            set_artist_title(image.name as string)
            set_genre_title(song_create.formData.get('primary_genre') as string + " - " + song_create.formData.get('secondary_genre'))
            set_Label_title(song_create.formData.get('record_laber_name') as string)
            set_release_date_title(song_create.formData.get('originaly_released') as string)
            renderImage(image)
            setSubmit(true)
        }
    }, [])


    return (
        <div className='wrap-content'>
            <div className='main-content'>

                <div className='content-item'>
                    <div className='release-details'>
                        <div className='release-detail-header'>
                            <h2 className='title'>Release Details</h2>
                        </div>
                        <div className='release-detail-note'>
                            <span>Complete your release by clicking on the tour steps below and filing in each page</span>
                        </div>
                        <div className='release-detail-option'>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/album_detail"} className='option'>
                                    Album Details
                                    {
                                        song_create.formData ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/add_audio"} className='option'>
                                    Add Audio
                                    {
                                        song_create.formData?.get('audio') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/add_artwork"} className='option'>
                                    Add Artwork
                                    {
                                        song_create.formData?.get('image') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/add_lyric"} className='option'>
                                    Add Lyric
                                    {
                                        song_create.formData?.get('lyric') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='content-item'>
                    <div className='album-detail'>
                        <div className='release-detail-header'>
                            <h2 className='title'>Album Details</h2>
                        </div>
                        <div className='album-detail-content'>
                            <div className='detail'>
                                <div className='detail-title'>
                                    <span>Title</span>
                                    <span className='text'>{detail_title}</span>
                                </div>
                                <div className='artist-name'>
                                    <span>Artist Name</span>
                                    <span className='text'>{artist_title}</span>
                                </div>
                                <div className='genre-title'>
                                    <span>Genre</span>
                                    <span className='text'>{genre_title}</span>
                                </div>
                                <div className='Label-title'>
                                    <span>Label</span>
                                    <span className='text'>{Label_title}</span>
                                </div>
                                <div className='release-data-title'>
                                    <span>Release Date</span>
                                    <span className='text'>{release_date_title}</span>
                                </div>

                            </div>
                            <div className='album'>
                                <div className='wrap-album'>
                                    <img className='artist_detail'></img>
                                </div>
                            </div>
                        </div>
                        {
                            Submit ?
                                <div className='submit'>
                                    <div className='btn_submit' onClick={send}>Send</div>
                                </div>
                                : <></>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
