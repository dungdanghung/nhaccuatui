import "./profile.css"
import { baseIMG } from "../../config/api"
import { useEffect, useState, useRef } from "react"

function Profile_Item({ data, itembirthday = false }: any) {
    const [comment, setcomment] = useState<string>("")
    const heightofinputcomment = useRef<HTMLTextAreaElement>(null)

    function handlediskplay(e: any) {
        const a = e.target.children[1]
        const b = e.target.children[0]
        if (a.style.left !== "0%") {
            a.style.left = "0%"
            b.style.left = "0%"
            a.style.animationPlayState = 'paused';
        } else {
            a.style.left = "30%"
            b.style.left = "-25%"
            a.style.animationPlayState = 'running';
        }
    }

    useEffect(() => {
        const element = heightofinputcomment.current as HTMLTextAreaElement
        if (element) {
            element.style.height = "auto"
            element.style.height = element.scrollHeight + "px"
        }
    }, [comment])

    function formatdate(date: any) {
        let newdate = new Date(date).toLocaleDateString('en-US')
        let newdate_split = newdate.split("/")
        return `${newdate_split[0]} Tháng ${newdate_split[1]}, ${newdate_split[2]}`
    }

    return (
        <div className="contentitem">
            <div className="headeritemcontent">
                <div className="wrapavatar_nameandtime">
                    <div className="avatar">
                        <img src={`${baseIMG}img/avatar/${data.avatar}`} />
                    </div>
                    <div className="nameandtime">
                        <div className="name">{data.user_name}</div>
                        {
                            itembirthday ?
                                <div className="time">{formatdate(data.birth_day)}</div>
                                :
                                <div className="time">{ }</div>
                        }
                    </div>
                </div>
                <div className="more">
                    <i className="fas fa-ellipsis-h"></i>
                </div>
            </div>
            {
                itembirthday ?
                    <div className="birthimage">
                        <img src={`${baseIMG}img/orther/birth.jpg`} />
                    </div>
                    :
                    <div className="maincontent">
                        <div className="content" onClick={handlediskplay}>
                            <div className="wrapdisk">
                                <img src={`${baseIMG}img/orther/music_128x128.png`} />
                            </div>
                            <div className="disk" style={{ left: "0%", animationPlayState: 'paused' }}>
                                <img src={`${baseIMG}img/orther/music_128x128.png`} />
                            </div>
                        </div>
                    </div>
            }
            <div className="action">
                <div className="wrapaction">
                    <div className="heart">
                        <i className="fas fa-heart"></i>
                    </div>
                    <div className="comment">
                        <i className="fas fa-comments"></i>
                    </div>
                    <div className="share">
                        <i className="fas fa-paper-plane"></i>
                    </div>
                </div>
                <div className="save">
                    <i className="fas fa-bookmark"></i>
                </div>
            </div>
            <div className="countofheart">
                <span>1000 Lượt thích</span>
            </div>
            {
                itembirthday ?
                    <></>
                    :
                    <div className="textcontent">
                        <span> sfljsfjdljfsljfslfjsdlfjlj </span>
                    </div>
            }
            <div className="countcomment">
                <span>Xem tất cả 1000 bình luận</span>
            </div>
            <div className="addcomment">
                <div className="wrapcomment">
                    <textarea
                        ref={heightofinputcomment}
                        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                            const element = e.target as HTMLTextAreaElement
                            setcomment(element.value)
                        }}
                        placeholder="Thêm bình luận"
                        value={comment}
                    />
                    <i className="fas fa-location-arrow"></i>
                </div>
            </div>
        </div>
    )
}


export default Profile_Item