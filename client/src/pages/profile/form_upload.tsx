import "./profile.css"
import { useEffect, useRef } from "react"
import { baseIMG } from "../../config/api"
import { useAppContext } from "../../context"
import { create } from "../../api/post"

function Form_uploadsong({ closepopup }: any) {
    const { user, song_create } = useAppContext()
    const heightofinputcomment = useRef<HTMLTextAreaElement>(null)


    function closepopupuploadfile(e: any) {
        if (e.target.className === "popupthemmoi" || e.target.className === "more") {
            closepopup()
        }
    }
    function uploadfile() {
        const test_content = document.querySelector('#text_area') as HTMLTextAreaElement
        const file_song = document.querySelector('.file_song') as HTMLInputElement
        const file_image = document.querySelector('.file_artwork') as HTMLInputElement
        const data = {
            "text_content": test_content.value,
            "file_song": file_song.files as FileList,
            "file_image": file_image.files as FileList
        }
        const formdata = new FormData
        formdata.append('text_content', data.text_content)
        formdata.append('file_song', data.file_song[0])
        formdata.append('file_image', data.file_image[0])

        create(formdata)
            .then((rs) => {
                if (rs) window.location.reload()
            })
    }

    useEffect(() => {
        const element = heightofinputcomment.current as HTMLTextAreaElement
        if (element) {
            element.style.height = "auto"
            element.style.height = element.scrollHeight + "px"
        }
    }, [])


    function textContentInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    function song_input() {
        const element = document.querySelector('.file_song') as HTMLInputElement
        element.click()
    }
    function image_input() {
        const element = document.querySelector('.file_artwork') as HTMLInputElement
        element.click()
    }

    function handle_image_create_input() {
        const input = document.querySelector('.file_artwork') as HTMLInputElement
        const image_background = document.getElementById('wrapdiskuploadthumbnail') as HTMLImageElement
        const wrap_disk = document.querySelector('.wrapdisk') as HTMLDivElement
        const disk = document.querySelector('.disk') as HTMLDivElement
        if (input) {
            const files = input.files as FileList
            if (files[0]) {
                image_background.src = URL.createObjectURL(files[0])
            }
            image_background.style.objectFit = "contain"
            wrap_disk.style.left = '50%'
            disk.style.left = '50%'
            wrap_disk.style.left = '41%'
            disk.style.left = '67%'
        }
    }

    return (
        <form className="popupthemmoi" onClick={closepopupuploadfile}>
            <div className="popupcontentuploadfile">
                <div className="contentitem">
                    <div className="headeritemcontent">
                        <div className="wrapavatar_nameandtime">
                            <div className="avatar">
                                <img src={`${baseIMG}img/avatar/${user.user?.avatar}`} />
                            </div>
                            <div className="nameandtime">
                                <div className="name">{user.user?.user_name}</div>
                            </div>
                        </div>
                        <button type="reset" className="more" id="closepopupuploadfile">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                onInput={textContentInput}
                                placeholder="text content"
                                name="textcontent"
                                id="text_area"
                            />
                        </div>
                    </div>

                    <div className="maincontent">
                        <div className="content">
                            <div className="wrapdisk" >
                                <img id="wrapdiskuploadthumbnail" className={""} src={`${baseIMG}img/orther/music_128x128.png`} />
                            </div>
                            <div className="disk" style={{ animationPlayState: 'paused' }}>
                                <img id="diskuploadthumbnail" className={""} src={`${baseIMG}img/orther/disk.png`} />
                            </div>
                        </div>
                        <img className="thumbnailsong" src="" style={{ display: "none" }} />
                    </div>

                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <div className='release-detail-option-item'>
                                <div className='option' onClick={song_input}>
                                    Add Song
                                    {
                                        song_create.formData?.get('media') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </div>
                                <input type="file" className="file_song" name="file_song" hidden />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <div className='release-detail-option-item'>
                                <div className='option' onClick={image_input}>
                                    Add Artwork
                                    {
                                        song_create.formData?.get('image') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </div>
                                <input type="file" className="file_artwork" name="file_artwork" hidden onChange={handle_image_create_input} />
                            </div>
                        </div>
                    </div>


                    <div className="btmpuload">
                        <span onClick={uploadfile}> Thêm mới </span>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default Form_uploadsong