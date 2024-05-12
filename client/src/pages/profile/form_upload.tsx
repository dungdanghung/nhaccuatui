import "./profile.css"
import { useEffect, useState, useRef } from "react"
import { baseIMG } from "../../config/api"
// import { uploadsong } from "../../fetch/song"
import { useAppContext } from "../../context"

function Form_uploadsong({ closepopup }: any) {
    const { user } = useAppContext()
    const [backgrounduploadtype, setbackgrounduploadtype] = useState("normal")
    const [text, settext] = useState('')
    const [statusoffileinput, setstatusoffileinput] = useState("off")
    const [songname, setsongname] = useState("")
    const [authername, setauthername] = useState("")
    const [imagesong, setimagesong] = useState("")
    const [thumbnailsong, setthumbnailsong] = useState("")
    const heightofinputcomment = useRef<HTMLTextAreaElement>(null)


    function closepopupuploadfile(e: any) {
        if (e.target.className === "popupthemmoi" || e.target.className === "more") {
            closepopup()
        }
    }
    function uploadfile() {
        const file = document.querySelector("#filesong") as HTMLInputElement
        const image = document.querySelector("#imagesong") as HTMLInputElement
        const thumbnail = document.querySelector("#thumbnailsong") as HTMLInputElement
        const file_data = file.files as any
        const image_data = image.files as any
        const thumbnail_data = thumbnail.files as any
        const data = {
            filesong: file_data[0],
            fileimage: image_data[0],
            filethumbnail: thumbnail_data[0],
            songname: songname,
            imagename: imagesong,
            thumbnailname: thumbnailsong,
            singer: authername
        }
        const checkitem = Array.from(data as any).every((item) => {
            if (!item) return false
            else return true
        })
        if (!checkitem) {
            console.log("dien day du thong tin")
            return
        } else {
            // let token = window.localStorage.getItem("token")
            // token = JSON.parse(token)
            // uploadsong(data, token.accessToken)
        }
    }
    function changetypeupload(e: any) {
        if (e.target.className === "normalsong") setbackgrounduploadtype("normal")
        if (e.target.className === "specialsong") setbackgrounduploadtype("special")
    }
    useEffect(() => {
        if (text !== "") {
            const element = heightofinputcomment.current as HTMLTextAreaElement
            if (element) {
                element.style.height = "auto"
                element.style.height = element.scrollHeight + "px"
            }
        }
    }, [text])
    useEffect(() => {
        const a = document.querySelector(".wrapdisk") as HTMLDivElement
        const b = document.querySelector(".disk") as HTMLDivElement
        if (a && b) {
            if (statusoffileinput === "off") {
                a.style.left = "0%"
                b.style.left = "0%"
            } else {
                a.style.left = "-30%"
                b.style.left = "25%"
            }
        }
    }, [statusoffileinput])
    function clickchosefile(e: any) {
        e.target.children[0]?.click()
        setstatusoffileinput("off")
    }
    function handlefileinput(type: string) {
        return (e: any) => {
            if (type === "imagesong") {
                setimagesong(e.target.files[0].name)
                const a = document.querySelector("#wrapdiskuploadthumbnail") as any
                const b = document.querySelector("#diskuploadthumbnail") as any
                var fr = new FileReader();
                fr.onload = function () {
                    a.src = fr.result;
                    b.src = fr.result;
                }
                fr.onloadend = () => {
                    setstatusoffileinput("on")
                    b.style.display = "block"
                }
                if (e.target.files.length !== 0) {
                    fr.readAsDataURL(e.target.files[0]);
                }
            } else if (type === "namesong") {
                setsongname(e.target.files[0].name)
                setstatusoffileinput("on")
            } else if (type === "thumbnailsong") {
                setthumbnailsong(e.target.files[0].name)
                const a = document.querySelector(".thumbnailsong") as any
                var fr = new FileReader();
                fr.onload = function () {
                    a.src = fr.result;
                }
                fr.onloadend = () => {
                    a.style.display = "block"
                    setstatusoffileinput("on")
                }
                if (e.target.files.length !== 0) {
                    fr.readAsDataURL(e.target.files[0]);
                }
            }
        }
    }

    return (
        <form className="popupthemmoi" onClick={closepopupuploadfile}>
            <div className="popupcontentuploadfile">
                <div className="contentitem">
                    <div className="headeritemcontent">
                        <div className="wrapavatar_nameandtime">
                            <div className="avatar">
                                <img src={`${baseIMG}/avatar/${user.user?.avatar}`} />
                            </div>
                            <div className="nameandtime">
                                <div className="name">{user.user?.user_name}</div>
                            </div>
                        </div>
                        <button type="reset" className="more" id="closepopupuploadfile">
                            {/* <FontAwesomeIcon icon={faXmark} /> */}
                        </button>
                    </div>
                    <div className="optionupload">
                        <div onClick={changetypeupload} className="normalsong" style={{ backgroundColor: backgrounduploadtype === "normal" ? "#afafaf63" : "transparent" }}>
                            Quyền người dùng
                        </div>
                        <div onClick={changetypeupload} className="specialsong" style={{ backgroundColor: backgrounduploadtype === "special" ? "#afafaf63" : "transparent" }}>
                            Quyền tác giả
                        </div>
                    </div>
                    <div className="maincontent">
                        <div className="content">
                            <div className="wrapdisk">
                                <img id="wrapdiskuploadthumbnail" className={""} src="http://localhost:4000/orther/music_128x128.png" />
                            </div>
                            <div className="disk" style={{ left: "0%", animationPlayState: 'paused' }}>
                                <img id="diskuploadthumbnail" className={""} src="" style={{ display: "none" }} />
                            </div>
                        </div>
                        <img className="thumbnailsong" src="" style={{ display: "none" }} />
                    </div>

                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputnamesong"
                                ref={heightofinputcomment}
                                onInput={(e) => {
                                    const element = e.target as HTMLTextAreaElement
                                    setsongname(element.value)
                                }}
                                placeholder="name song"
                                value={songname}
                            />
                            <div className="btnsetfile" onClick={clickchosefile}>
                                chose file
                                <input id="filesong" type="file" onInput={handlefileinput("namesong")} />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputimagesong"
                                ref={heightofinputcomment}
                                onInput={(e) => {
                                    const element = e.target as HTMLTextAreaElement
                                    setimagesong(element.value)
                                }}
                                placeholder="image song"
                                value={imagesong}
                            />
                            <div className="btnsetfile" onClick={clickchosefile}>
                                chose file
                                <input id="imagesong" type="file" onInput={handlefileinput("imagesong")} />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputthumbnailsong"
                                ref={heightofinputcomment}
                                onInput={(e) => {
                                    const element = e.target as HTMLTextAreaElement
                                    setthumbnailsong(element.value)
                                }}
                                placeholder="thumbnail song"
                                value={thumbnailsong}
                            />
                            <div className="btnsetfile" onClick={clickchosefile}>
                                chose file
                                <input id="thumbnailsong" type="file" onInput={handlefileinput("thumbnailsong")} />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputauther"
                                ref={heightofinputcomment}
                                onInput={(e) => {
                                    const element = e.target as HTMLTextAreaElement
                                    setauthername(element.value)
                                }}
                                placeholder="tac gia"
                                value={authername}
                            />
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